const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();

// Define the scopes for OAuth
const SCOPES = [
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.modify',
];

const TOKEN_PATH = 'token.json';

// Function to authenticate and get OAuth2 client
async function authenticate() {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'http://localhost:8081/api/gmail/oauth2callback' // Adjust to your callback URL
    );

    let token;

    // Check if the token file exists
    if (fs.existsSync(TOKEN_PATH)) {
        token = JSON.parse(fs.readFileSync(TOKEN_PATH));
        oAuth2Client.setCredentials(token);
        return oAuth2Client;
    }

    // If token doesn't exist, initiate OAuth flow
    return new Promise((resolve, reject) => {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });

        // Redirect to the authorization URL
        resolve(authUrl);
    });
}

// Function to handle OAuth callback
async function handleOAuthCallback(req, res) {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'http://localhost:8081/api/gmail/oauth2callback' // Ensure this matches your callback URL
    );

    const code = req.query.code;
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
        console.log('Token stored to', TOKEN_PATH);
        res.redirect('http://localhost:8081'); // Redirect after authentication
    } catch (error) {
        console.error('Error retrieving access token', error);
        res.status(500).send('Error retrieving access token.');
    }
}

// Function to list messages
async function listMessages(req, res) {
    try {
        const auth = await authenticate(); // Get the authenticated client
        const gmail = google.gmail({ version: 'v1', auth });

        const result = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });
        const messages = result.data.messages || [];

        if (messages.length === 0) {
            return res.status(200).send('No messages found.');
        }

        const messageDetails = [];
        for (const message of messages) {
            const msg = await gmail.users.messages.get({
                userId: 'me',
                id: message.id,
            });

            const snippet = msg.data.snippet;
            const subjectHeader = msg.data.payload.headers.find(header => header.name === 'Subject');
            const subject = subjectHeader ? subjectHeader.value : '(No Subject)';

            messageDetails.push({
                id: message.id,
                subject: subject,
                snippet: snippet,
            });
        }

        res.status(200).json({ messages: messageDetails });
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).send('Error retrieving messages: ' + error.message);
    }
}

// Export functions
module.exports = {
    authenticate,
    handleOAuthCallback,
    listMessages,
};

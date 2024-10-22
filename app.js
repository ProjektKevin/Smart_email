const { google } = require('googleapis');
const http = require('http');
const url = require('url');
const destroyer = require('server-destroy'); // To easily stop the server once done
const fs = require('fs');

// Use dynamic import if ESM features are required
(async () => {
    const open = (await import('open')).default;

    const SCOPES = [
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.compose',
        'https://www.googleapis.com/auth/gmail.modify',
    ];

    const TOKEN_PATH = 'token.json';

    async function authenticate() {
        const oAuth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            'http://localhost:3000/oauth2callback'
          );

        let token;

        if (fs.existsSync(TOKEN_PATH)) {
            token = JSON.parse(fs.readFileSync(TOKEN_PATH));
            oAuth2Client.setCredentials(token);
            return oAuth2Client;
        }

        return new Promise((resolve, reject) => {
            const authUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES,
            });

            const server = http.createServer(async (req, res) => {
                if (req.url.indexOf('/oauth2callback') > -1) {
                    const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
                    const code = qs.get('code');

                    res.end('Authentication successful! You can close this window.');
                    server.destroy();

                    oAuth2Client.getToken(code, (err, token) => {
                        if (err) return reject(err);
                        oAuth2Client.setCredentials(token);
                        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
                        console.log('Token stored to', TOKEN_PATH);
                        resolve(oAuth2Client);
                    });
                }
            }).listen(3000, () => {
                open(authUrl);
            });

            destroyer(server);
        });
    }

    async function main() {
        const auth = await authenticate();
        const gmail = google.gmail({ version: 'v1', auth });

        const res = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });
        const messages = res.data.messages || [];

        if (messages.length === 0) {
            console.log('No messages found.');
        } else {
            console.log('Messages:');
            for (const message of messages) {
                const msg = await gmail.users.messages.get({
                    userId: 'me',
                    id: message.id,
                });

                const snippet = msg.data.snippet;
                const subjectHeader = msg.data.payload.headers.find(header => header.name === 'Subject');
                const subject = subjectHeader ? subjectHeader.value : '(No Subject)';

                console.log(`- Message ID: ${message.id}`);
                console.log(`  Subject: ${subject}`);
                console.log(`  Snippet: ${snippet}`);
                console.log('-----------------------------------------');
            }
        }
    }

    main().catch(console.error);
})();
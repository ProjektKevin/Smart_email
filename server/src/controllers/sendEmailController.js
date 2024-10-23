const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const path = require('path');

// Path to your Service Account JSON key file
const keyFilePath = path.join(__dirname, '../../serviceKeys.json');
const serviceAccount = require(keyFilePath);

// Function to get an access token
async function getAccessToken() {
  try {
    // Create a new JWT client with the service account
    const jwtClient = new google.auth.JWT(
      serviceAccount.client_email,   // Client email from the JSON key
      null,                          // No need to provide a key file directly
      serviceAccount.private_key,    // Private key from the JSON key
      ['https://mail.google.com/']   // Scope for Gmail API
    );

    // Authenticate and get the access token
    const tokens = await jwtClient.authorize();
    console.log("Access Token: ", tokens.access_token);

    return tokens.access_token;
  } catch (error) {
    console.error('Error generating access token:', error);
    throw error;
  }
}

module.exports.sendEmail = async (req, res, next) => {
  try {
    // Retrieve the access token
    const accessToken = await getAccessToken();  // Await the access token retrieval

    // Get the email, subject, and message from the frontend
    const { email, subject, message } = req.body;

    // Set up Nodemailer transport with the access token
    const transporter = nodemailer.createTransport({
      service: "gmail", // Gmail service
      auth: {
        type: "OAuth2",
        user: "sepp.smart.email.test@gmail.com", // Your email address
        accessToken: accessToken,  // Use the access token
        clientId: serviceAccount.client_id,
        clientSecret: serviceAccount.client_secret,
      },
    });

    const mailOptions = {
      from: "sepp.smart.email.test@gmail.com",
    //   to: email,
    //   subject: subject,
    //   text: message,
        to: 'mizutaniyuki01@gmail.com',
        subject: 'Test email',
        message: 'This is but a test email'
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send("Error sending email: " + error.toString());
      }
      res.status(201).send("Email sent successfully!");
    });

  } catch (error) {
    console.error("Got some error sending email: ", error);
    res.status(500).send("Got some error sending email");
  }
};

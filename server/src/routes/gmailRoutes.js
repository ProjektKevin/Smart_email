const express = require('express');
const { authenticate, handleOAuthCallback, listMessages } = require('../controllers/gmailController'); // Adjust the path as necessary

const router = express.Router();

// Route to initiate the OAuth flow
router.get('/oauth', async (req, res) => {
    try {
        const authUrl = await authenticate();
        res.redirect(authUrl);
    } catch (error) {
        console.error('Error initiating OAuth:', error);
        res.status(500).send('Error initiating OAuth.');
    }
});

// Route to handle OAuth callback
router.get('/oauth2callback', handleOAuthCallback); // This now matches the URL

// Route to list messages after authentication
router.get('/messages', listMessages);

module.exports = router;

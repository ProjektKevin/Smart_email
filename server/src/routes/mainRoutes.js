const express = require('express');
const router = express.Router();

// define routes
const sendEmailRoutes = require('./sendEmailRoute.js');
const geminiRoutes = require('./geminiRoute.js');
const gmailRoutes = require('./gmailRoutes.js'); // Add Gmail routes

// --- ROUTES ---
router.use('/sendEmail', sendEmailRoutes);
router.use('/gemini', geminiRoutes);
router.use('/gmail', gmailRoutes); // Set up the Gmail routes under '/gmail'

module.exports = router;
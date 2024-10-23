const express = require('express');

const router = express.Router();
const sendEmailRoute = require('./sendEmailRoute.js');

// --- ROUTES ---
router.use('/sendEmail', sendEmailRoute);


module.exports = router;
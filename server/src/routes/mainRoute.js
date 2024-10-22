const express = require('express');

const router = express.Router();
const sendEmailRoutes = require('./sendEmailRoute.js');

// --- ROUTES ---
router.use('/sendEmail', sendEmailRoutes);


module.exports = express;
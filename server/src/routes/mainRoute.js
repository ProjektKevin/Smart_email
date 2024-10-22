const express = require('express');

const router = express.Router();

// define routesz
const sendEmailRoutes = require('./sendEmailRoute.js');
const geminiRoutes = require('./geminiRoute.js');

// --- ROUTES ---
router.use('/sendEmail', sendEmailRoutes);
router.use('/gemini', geminiRoutes);


module.exports = router;
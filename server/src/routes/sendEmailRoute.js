const express = require('express');

const sendEmailController = require('../controllers/sendEmailController.js');
const router = express.Router();

// --- ROUTES ---
router.post('/', sendEmailController.sendEmail);


module.exports = router;
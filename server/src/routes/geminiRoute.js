const express = require('express');
const router = express.Router();

const controller = require('../controllers/geminiController.js');

// --- CONTROLLERS ---
router.post('/', controller.geminiGenerateEmail);


module.exports = router;
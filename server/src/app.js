// INCLUDES
const express = require('express');
const mainRoutes = require('./routes/sendEmailRoutes.js');
require('dotenv').config(); // Load environment variables


// CREATE APP
const app = express();

// USES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SETUP ROUTES
app.get('/', (req, res) => {
    res.send('I am Alive!');
});


// SETUP STATIC FILES
app.use('/api', mainRoutes); // All routes under '/api'

// EXPORT APP
module.exports = app;

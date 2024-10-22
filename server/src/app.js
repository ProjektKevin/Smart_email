// INCLUDES
const express = require('express');
const mainRoutes = require('./routes/sendEmailRoute.js');


// CREATE APP
const app = express();

// USES
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// SETUP ROUTES
app.get('/', (req, res) => {
    const test = 123;
    res.send('I am Alive!')
});
app.use("/api", mainRoutes);

// SETUP STATIC FILES
app.use("/", express.static('public'));

// EXPORT APP
module.exports = app;
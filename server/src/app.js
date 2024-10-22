// INCLUDES
const express = require('express');

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

// routes
const mainRoutes = require("./routes/mainRoute");

// SETUP STATIC FILES
app.use("/api", mainRoutes);

// EXPORT APP
module.exports = app;
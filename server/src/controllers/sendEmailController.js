const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

module.exports.sendEmail = (req, res, next) => {
    console.log()
    try {
        console.log('I am here 0');
        const { email, subject, message } = req.body;

        // Set up Nodemailer transport
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use any email service provider like Gmail, Outlook, etc.
            auth: {
                user: 'sepp.smart.email.test@gmail.com',
                pass: 'letsGETsmart1111!'
            }
        });
        console.log('I am here 1');

        const mailOptions = {
            from: 'sepp.smart.email.test@gmail.com',
            to: email,
            subject: subject,
            text: message
        };
        console.log('I am here 2');

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.send('Error sending email: ' + error.toString());
            }
            res.status(201).message('Email sent successfully!');
        });
        console.log('I am here 3');

    }
    catch(error) {
        res.status(500).erorr("Got some error sending Email");
    } 

}
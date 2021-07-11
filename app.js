const express = require('express');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const csp = require('./csp');

// Require routes
const mainRoutes = require('./routes');
const portfolioRoutes = require('./routes/portfolio');

// Initialise Express
const app = express();

// Require .env variables
require('dotenv').config();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Logs reqs to console
app.use(logger('dev'));

// Addresses Content Security Policy
app.use(csp);

// Prepares Express to receive json
app.use(express.json());

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set routes
app.use(mainRoutes);
app.use('/portfolio', portfolioRoutes);

// Contact form
app.post('/contact', async (req, res, next) => {
  // .env variables
  const { SECRET_KEY, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PW, EMAIL_TO } =
    process.env;

  // req. fields
  const { token, subject, name, email, message } = req.body;

  // Honeypot field
  const honeypot = req.body['last-name'];

  // reCAPTCHA v3
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}&remoteip=${req.socket.remoteAddress}`;

  const recaptcha = await fetch(url, { method: 'POST' }).then((res) =>
    res.json(),
  );

  // Initiates the SMTP server
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PW,
    },
  });

  // Specifies the email options
  const mail = {
    from: `mcartmell.com ${EMAIL_USER}`,
    to: EMAIL_TO,
    subject,
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  console.log(req.body);

  // Sends the email if honeypot and reCAPTCHA conditions are met
  if (!honeypot && recaptcha.success && recaptcha.score >= 0.5) {
    transporter.sendMail(mail, (err) => {
      if (err) {
        console.log('Email failed!');
        res.status(400).end();
      } else {
        console.log('Email sent');
        res.status(200).end();
      }
    });
  }
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  if (err) {
    console.log('Global error handler called', err);
  }
  if (err.status === 404) {
    err.message = `Page Not Found`;
    res
      .status(404)
      .render('error', { id: 'error', title: '404 | Page Not Found', err });
  } else {
    err.message = err.message || `Something's gone wrong on the server`;
    res
      .status(err.status || 500)
      .render('error', { id: 'error', title: '500 | Server Error', err });
  }
});

module.exports = app;

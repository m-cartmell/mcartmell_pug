const express = require('express');
const helmet = require('helmet');

// Initialise Express
const app = express();

// Initialise Helmet to secure HTTP headers
app.use(helmet());

// Initalise CSP
const src = {
  _1: 'https://www.google.com',
  _2: 'https://www.google-analytics.com',
  _3: 'https://www.googletagmanager.com',
  _4: 'https://fonts.googleapis.com',
  _5: '*.gstatic.com',
  _6: 'data:',
  _7: '*.elfsight.com',
  _8: 'https://proxy.elfsightcdn.com',
  _9: 'https://api.instacloud.io',
};

const { _1, _2, _3, _4, _5, _6, _7, _8, _9 } = src;

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      scriptSrc: [`'self'`, `'unsafe-inline' ${_1} ${_2} ${_3} ${_5} ${_7}`],
      styleSrc: [`'self'`, `'unsafe-inline' ${_4}`],
      fontSrc: [`'self'`, _5],
      frameSrc: [`'self'`, _1],
      connectSrc: [`'self'`, `${_2} ${_7} ${_9}`],
      imgSrc: [`'self'`, `${_2} ${_6} ${_8}`],
    },
  }),
);

module.exports = app;

const router = require('express').Router();
const { newPage } = require('../controllers/portfolio'); 
const redirects = require('./redirects');

router.use('/', redirects);

router.get('/:id', newPage);

module.exports = router;

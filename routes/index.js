const router = require('express').Router();
const { newPage } = require('../controllers/index');

router.get('/', newPage);

module.exports = router;

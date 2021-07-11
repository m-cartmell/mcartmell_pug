const router = require('express').Router();

// Redirect /portfolio to /home
router.get('/', (req, res, next) => res.redirect('/'));

// Old portfolio path redirects
router.get('/status%20seating', (req, res, next) => {
  res.redirect(301, '/portfolio/status-seating');
});
router.get('/pride%20&%20joy', (req, res, next) => {
  res.redirect(301, '/portfolio/pride-joy');
});
router.get('/fast-track%20telecom', (req, res, next) => {
  res.redirect(301, '/portfolio/fast-track-telecom');
});
router.get('/johnsons%20jewellers', (req, res, next) => {
  res.redirect(301, '/portfolio/johnsons-jewellers');
});
router.get('/genie%20bio%20clean', (req, res, next) => {
  res.redirect(301, '/portfolio/genie-bio-clean');
});
router.get('/the%20company%20of%20master%20jewellers', (req, res, next) => {
  res.redirect(301, '/portfolio/cmj');
});
router.get('/wongs%20jewellers', (req, res, next) => {
  res.redirect(301, '/portfolio/wongs-jewellers');
});
router.get('/email', (req, res, next) => {
  res.redirect(301, '/portfolio/email-marketing');
});
router.get('/email%20marketing', (req, res, next) => {
  res.redirect(301, '/portfolio/email-marketing');
});
router.get('/facets%20creative', (req, res, next) => {
  res.redirect(301, '/portfolio/facets-creative');
});
router.get('/oxfam%20creative%20concept', (req, res, next) => {
  res.redirect(301, '/portfolio/oxfam-creative-concept');
});
router.get('/oxfam-concept', (req, res, next) => {
  res.redirect(301, '/portfolio/oxfam-creative-concept');
});
router.get(`'what%20an%20experience'`, (req, res, next) => {
  res.redirect(301, '/portfolio/travel');
});

module.exports = router;

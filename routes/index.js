var express = require('express');
var router = express.Router();
const userControllers=require('../controllers/userControllers')

/* GET home page. */
//signin
router.get('/signin',userControllers.SigninGet)
router.post('/signin',userControllers.SigninPost)

router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/inscan', function(req, res, next) {
  res.render('inscan');
});
router.get('/outscan', function(req, res, next) {
  res.render('outscan');
});
router.get('/DRS', function(req, res, next) {
  res.render('DRS');
});

router.get('/consignment-report', function(req, res, next) {
  res.render('consignment-report');
});
router.get('/consignment-registration', function(req, res, next) {
  res.render('consignment-registration');
});
router.get('/consignment-details', function(req, res, next) {
  res.render('consignment-details');
});


module.exports = router;

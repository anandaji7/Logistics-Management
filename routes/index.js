var express = require('express');
var router = express.Router();
const userControllers=require('../controllers/userControllers')
const consignmentController=require('../controllers/consignmentController')

const userauth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};
/* GET home page. */
//signin
router.get('/signin',userControllers.SigninGet)
router.post('/signin',userControllers.SigninPost)

router.get('/home',userauth, function(req, res, next) {
  res.render('home',{userDetails:req.session.user});
});

router.get('/login',userControllers.getLogin)
router.post('/login',userControllers.postLogin)

router.get('/inscan', function(req, res, next) {
  res.render('inscan');
});
router.get('/outscan', function(req, res, next) {
  res.render('outscan');
});
router.get('/DRS', function(req, res, next) {
  res.render('DRS');
});

router.get('/consignment-report',userauth,consignmentController.getConsignment);
router.get('/consignment-registration',userauth,consignmentController.getRegistration);
router.post('/consignment-registration',consignmentController.postRegistration);
router.get('/consignment-details', function(req, res, next) {
  res.render('consignment-details');
});


module.exports = router;

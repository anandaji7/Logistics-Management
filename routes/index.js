var express = require('express');
var router = express.Router();
const userControllers=require('../controllers/userControllers')
const consignmentController=require('../controllers/consignmentController')
const inscanController=require('../controllers/inscanController')
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

router.get('/',userauth, function(req, res, next) {
  res.render('home',{userDetails:req.session.user});
});

router.get('/login',userControllers.getLogin)
router.post('/login',userControllers.postLogin)

router.get('/inscan',userauth,inscanController.getinscan);
router.post('/inscan',inscanController.postInscan)
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

router.get('/missing-consignment',(req,res)=>{
  res.render('missing-consignment')
})


module.exports = router;

var express = require('express');
var router = express.Router();
const userControllers=require('../controllers/userControllers')
const consignmentController=require('../controllers/consignmentController')
const outscanController=require('../controllers/outscanController')
const inscanController=require('../controllers/inscanController')
const drsController=require('../controllers/drsController')
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
router.get('/logout',userControllers.getLogout)

router.get('/inscan',userauth,inscanController.getinscan);
router.post('/inscan',inscanController.postInscan)
router.get('/outscan',userauth,outscanController.getOutscan);
router.post('/outscan',outscanController.postOutscan)
router.get('/DRS',userauth,drsController.getDRS);
router.post('/DRS',userauth,drsController.postDRS)
router.get('/DRS-report',userauth,drsController.getDRSReport);
router.get('/DRS-view',userauth,drsController.getDRSView)

router.get('/consignment-report',userauth,consignmentController.getConsignment);
router.get('/consignment-registration',userauth,consignmentController.getRegistration);
router.post('/consignment-registration',userauth,consignmentController.postRegistration);
router.get('/consignment-registration2',userauth,consignmentController.getRegistration2)
router.post('/consignment-registration2',userauth,consignmentController.postRegistration2)
router.get('/consignment-details',userauth,consignmentController.getConsignmentDetails);
router.post('/consignment-details',userauth,consignmentController.postConsignmentDetails)
router.get('/edit-consignment',userauth,consignmentController.getEditConsignment1)
router.post('/edit-consignment',userauth,consignmentController.postEditConsignment1)
router.get('/edit-consignment2',userauth,consignmentController.getEditConsignment2)
router.post('/edit-consignment2',userauth,consignmentController.postEditConsignment2)

router.get('/missing-consignment',userauth,outscanController.getMissing)

router.get('/add-areas',userauth,userControllers.getaddAreas)
router.post('/add-areas',userControllers.postAddAreas)
router.get('/add-delivery-boys',userauth,userControllers.getaddDeleveryBoys)
router.post('/add-delivery-boys',userControllers.postAddDeleveryBoys)
router.post('/add-pincode',userControllers.postPincode)

router.get('/consinment-invoice',userauth,consignmentController.downloadConsignment)
module.exports = router;

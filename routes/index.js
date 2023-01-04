var express = require('express');
var router = express.Router();
const userControllers=require('../controllers/userControllers')
const consignmentController=require('../controllers/consignmentController')
const outscanController=require('../controllers/outscanController')
const inscanController=require('../controllers/inscanController')
const drsController=require('../controllers/drsController')
const inventoryController=require('../controllers/inventoryController');
const { render } = require('ejs');
const trackController=require('../controllers/trackController')
const deliveryControlleer=require('../controllers/deliveryController')

const userauth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

const deliveryauth=(req,res,next)=>{
  if(req.session.delivery){
    next()
  }else{
    res.redirect('/delivery')
  }
}
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
router.post('/inscan',userauth,inscanController.postInscan)
router.get('/outscan',userauth,outscanController.getOutscan);
router.post('/outscan',userauth,outscanController.postOutscan)
router.get('/DRS',userauth,drsController.getDRS);
router.post('/DRS',userauth,drsController.postDRS)
router.get('/DRS-report',userauth,drsController.getDRSReport);
router.get('/DRS-view',userauth,drsController.getDRSView) 
router.get('/DRS/approve-status/:id/:drsno',userauth,drsController.getDeliveryApprove)

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
router.post('/add-areas',userauth,userControllers.postAddAreas)
router.get('/delete-area/:in',userauth,userControllers.getDeleteArea)
router.get('/add-delivery-boys',userauth,userControllers.getaddDeleveryBoys)
router.post('/add-delivery-boys',userauth,userControllers.postAddDeleveryBoys)
router.get('/delete-delivery-boys/:id',userauth,userControllers.getDeleteDeleveryBoys)
router.post('/add-pincode',userauth,userControllers.postPincode)
router.get('/delete-pincodes/:in',userauth,userControllers.getDeletePincodes)
router.get('/inventory',userauth,inventoryController.getInventory)

router.get('/consinment-invoice',userauth,consignmentController.downloadConsignment)
// Traking
router.get('/track',userauth,trackController.getTrack)
router.post('/track',userauth,trackController.postTrack)
// Delivery boy
router.get('/delivery',deliveryControlleer.getDeliveryLogin)
router.post('/delivery',deliveryControlleer.postDeliveryLogin)
router.get('/delivery/home',deliveryauth,deliveryControlleer.getDeliveryhome)
router.get('/delivery/DRS-view/:drsno',deliveryauth,deliveryControlleer.getDeliveryView)
router.post('/delivery/DRS-view/:id/:drsno',deliveryauth,deliveryControlleer.postDeliveryView)



module.exports = router;

var express = require('express');
var router = express.Router();
const adminController=require('../controllers/adminControllers')
const creditClientController=require('../controllers/creditClientController')

const adminauth=(req,res,next)=>{
  if( req.session.adminlog){
    next()
  }else{
    res.redirect('/admin/login')
  }
 
}



/* GET users listing. */
router.get('/',adminauth,adminController.getAdmin);

router.get('/login',adminController.getLogin)
router.post('/login',adminController.postLogin)
router.get('/users',adminauth,adminController.getTotalUsers);

router.get('/add-client',adminauth,adminController.getCreateClient)
router.post('/add-client',adminauth,creditClientController.postRegisterClient)

router.get('/register-user',adminauth,adminController.getUserRegistration)
router.post('/register-user',adminauth,adminController.postUserRegistration)
router.get('/clients',adminauth,creditClientController.getCreditClientLists)
router.get('/edit-client',adminauth,creditClientController.getEditClient)

module.exports = router;

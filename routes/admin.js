var express = require('express');
var router = express.Router();
const adminController=require('../controllers/adminControllers')
const adminauth=(req,res,next)=>{
  if(req.session.adminlog){
    next()
  }
  res.redirect('/admin/login')
}



/* GET users listing. */
router.get('/',adminauth,adminController.getAdmin);

router.get('/login',adminController.getLogin)
router.post('/login',adminController.postLogin)
router.get('/users',adminController.getTotalUsers);

router.get('/add-client',adminauth,adminController.getCreateClient)

router.get('/register-user',adminauth,adminController.getUserRegistration)
router.post('/register-user',adminauth,adminController.postUserRegistration)


module.exports = router;

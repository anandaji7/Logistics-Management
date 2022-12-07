const Admin=require('../models/admin')
const User=require('../models/users')

exports.getLogin=(req,res)=>{
    res.render('admin-login')
}

exports.postLogin=async(req,res)=>{
const checkAdmin=await Admin.findOne({adminId:req.body.adminId,password:req.body.password})
if(checkAdmin){
    req.session.adminlog=true
    res.redirect('/admin')
}
}

exports.getAdmin=async(req,res)=>{
    res.render('admin')
}

exports.getTotalUsers=async(req,res)=>{
const users=await User.find()
    res.render('admin-users',{users})
}

exports.getCreateClient=async(req,res)=>{
    res.render('add-client')
}


exports.getUserRegistration=async(req,res)=>{
    res.render('admin-userRegistration')
}

exports.postUserRegistration=async(req,res)=>{
    const saveUser= new User({
        userId:req.body.userId,
        password:req.body.password,
        branchCode:req.body.branchCode,
        address:req.body.address,
        city:req.body.city
    })
    await saveUser.save()
    res.redirect('/register-user')
}
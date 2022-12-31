const Admin=require('../models/admin')
const User=require('../models/users')

exports.getLogin=async(req,res)=>{
    res.render('admin-login')

}

exports.postLogin=async(req,res)=>{

const checkAdmin=await Admin.findOne({adminId:req.body.adminId,password:req.body.password})
if(checkAdmin){
    req.session.adminlog=checkAdmin
    res.redirect('/admin')
}
}
exports.getLogoout=(req,res)=>{
    req.session.adminlog=false
    res.redirect('/admin/login')
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
    const userExists=await User.findOne({userId:req.body.userId})
    console.log(userExists);
    if(userExists){
        req.session.message={
            message:'A user already registered using this user Id'
        }
        res.redirect('/admin/register-user')
    }else{
    const saveUser= new User({
        userId:req.body.userId,
        password:req.body.password,
        branchCode:req.body.branchCode,
        address:req.body.address,
        city:req.body.city
    })
    await saveUser.save()
    req.session.message={
        message:'User registered successfully'
    }
    res.redirect('/admin/register-user')
    }
}


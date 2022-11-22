const Users=require('../models/users')



exports.SigninPost=async(req,res)=>{
    console.log(req.body);
    const userDetails=new Users({
        userId:req.body.userId,
        password:req.body.password, 
        branchCode:req.body.branch 
    })
    const savedUser=await userDetails.save()
    console.log(savedUser);
    res.redirect('/')
}

exports.SigninGet=(req,res)=>{
    res.render('signin')
}
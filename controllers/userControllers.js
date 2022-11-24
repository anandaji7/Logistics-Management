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

exports.getLogin=(req,res)=>{
    if(!req.session.user){
    res.render('login')
}else{
    res.redirect('/')
}
}

exports.postLogin=async(req,res)=>{
    
    const userDetail= await Users.findOne({userId:req.body.userId})
    if(userDetail){
        if(userDetail.password==req.body.password){
            req.session.user=userDetail
            res.redirect('/')
        }else{
            req.session.message = {
                message: "wrong password",
              };
              res.redirect('/login')
        }
    }else{
        req.session.message = {
            message: "userId doesnt exist",
          };
          res.redirect('/login')
    }

}

exports.getLogout=async(req,res)=>{
    req.session.user=false
    res.redirect('/login')
}
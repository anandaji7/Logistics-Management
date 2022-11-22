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
    res.render('login')
}

exports.postLogin=async(req,res)=>{
    const userDetail= await Users.findOne({userId:req.body.userId})
    if(userDetail){
        if(userDetail.password==req.body.password){
            req.session.user=userDetail
            res.redirect('/home')
        }else{
            req.session.message = {
                message: "wrong password",
              };
        }
    }else{
        console.log('user doesnt exist');
        req.session.message = {
            message: "user doesnt exist",
          };
    }
}
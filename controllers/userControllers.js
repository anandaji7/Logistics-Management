const Users=require('../models/users')
const Delivery=require('../models/delivery')
const ObjectId=require('mongoose').Types.ObjectId

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

exports.getLogin=async(req,res)=>{
    if(!req.session.user){
        const branchCode=await Users.find()
    res.render('user-login',{branchCode})
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

exports.getaddAreas=async(req,res)=>{
const areas=await Users.findOne({_id:ObjectId(req.session.user._id)})
    res.render('add-area',{areas})
}

exports.postAddAreas=async(req,res)=>{
    const saveAreas=await Users.updateOne(
        {_id:req.session.user._id},
        {$push:{areas:req.body.area}}
    )
    res.redirect('/add-areas')
}

exports.getDeleteArea=async(req,res)=>{
    await Users.updateOne(
        {_id:req.session.user._id},
        {$pull:{areas:{$in:[req.params.in]}}}
    )
    res.redirect('/add-areas')
}

exports.getaddDeleveryBoys=async(req,res)=>{
    const boysDetails=await Delivery.find({hub:ObjectId(req.session.user._id)})   
        res.render('add-delivery-boys',{boysDetails})
    }
    
    exports.postAddDeleveryBoys=async(req,res)=>{
        const createDeliveryAcc=new Delivery({
            name:req.body.name,
            userId:req.body.userId,
            password:req.body.password,
            hub:req.session.user._id
        })
        await createDeliveryAcc.save()
        res.redirect('/add-delivery-boys')
    }

    exports.getDeleteDeleveryBoys=async(req,res)=>{
        await Delivery.deleteOne({_id:req.params.id})
        res.redirect('/add-delivery-boys')
    }

    exports.postPincode=async(req,res)=>{
        const saveAreas=await Users.updateOne(
            {_id:req.session.user._id},
            {$push:{pincodes:req.body.pincode}}
        )
        res.redirect('/add-areas')
    }

    exports.getDeletePincodes=async(req,res)=>{
        await Users.updateOne(
            {_id:req.session.user._id},
            {$pull:{pincodes:{$in:[req.params.in]}}}
        )
        res.redirect('/add-areas')
    }
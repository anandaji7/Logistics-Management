const ObjectId=require('mongoose').Types.ObjectId
const Delivery=require('../models/delivery')
const DRS=require('../models/drs')
const Consignments=require('../models/consignments')

exports.getDeliveryLogin=(req,res)=>{
    res.render('delivery-login')
}

exports.postDeliveryLogin=async(req,res)=>{
    const userDetails=await Delivery.findOne({userId:req.body.userId})
    if(userDetails){
    if(userDetails.password===req.body.password){
        req.session.delivery=userDetails
        res.redirect('/delivery/home')
    }else{
        res.redirect('/delivery')
    }
}else{
    res.redirect('/delivery')
}
}

exports.getDeliveryhome=async(req,res)=>{
    const drs=await DRS.find({delivery:ObjectId(req.session.delivery._id)})
    res.render('delivery-home',{drs})
}

exports.getDeliveryView=async(req,res)=>{
    const drsno=req.params.drsno
    const drs=await DRS.findOne({drsno:req.params.drsno})
    const cons=[]
    for(let i=0;i< drs.docs.length; i++){
        const con=await Consignments.findOne({docno:drs.docs[i]})
        cons.push(con)
    }
    res.render('delivery-drs-view',{cons,drsno})
}

exports.postDeliveryView=async(req,res)=>{
    console.log(req.files?.image);
    const userfile=req.files?.image
    const uploadPath='./public/images/'+Date.now()+'.jpeg'
    const imagePath='images/'+Date.now()+'.jpeg'
    userfile?.mv(uploadPath,(err)=>{
        if(err){
            console.log(err+'error happened while moving image to');
        }else{
            console.log('image added successfully');
        }
    })
    await Consignments.updateOne({_id:ObjectId(req.params.id)},{
        $set:{image:imagePath,DeliveryStatus:'Delivered',DeliveryDate:Date.now()}
    })
    res.redirect('/delivery/DRS-view/'+req.params.drsno)
}
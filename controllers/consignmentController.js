const Consignments=require('../models/consignments')
const Users=require('../models/users')
const ObjectId=require('mongoose').Types.ObjectId
const Inscan=require('../models/inscan')
exports.getRegistration=(req,res)=>{
    res.render('registration')
}

exports.postRegistration=async(req,res)=>{
    
    const regDetails=new Consignments({
        docno:req.body.docno,
        pincode:req.body.pincode,
        center:req.body.center,
        type:req.body.type,
        Service:req.body.Service,
        travel_by:req.body.travel_by,
        child_badge:req.body.child_badge,
        insured:req.body.insured,
        cod:req.body.cod,
        value:req.body.value,
        weight:req.body.weight,
        description:req.body.description,
        length:req.body.length,
        width:req.body.width,
        height:req.body.height,
        vol_weight:req.body.vol_weight,
        content:req.body.content,
        is_eway:req.body.is_eway,
        eway:{bill_no: req.body.eway,date:req.body.expire_date},
        payment_mode:req.body.payment_mode,
        charges:req.body.charges,
        cod_charge:req.body.cod_charge,
        sgst:req.body.sgst,
        cgst:req.body.cgst,
        igst:req.body.igst,
        cess:req.body.cess_kfc,
        freight:req.body.freight,
        userId:ObjectId(req.session.user._id),
        date: new Date(),
        scan_status:true
    })
    const saveReg=await regDetails.save()
    const newinscan=new Inscan({
        docno:req.body.docno,
        conId:saveReg._id,
        userId:req.session.user._id,
        date:Date.now()
    }) 
    console.log(saveReg._id,11111111111);
    await newinscan.save()
    res.redirect('/consignment-registration2/?conId='+saveReg._id)
}

exports.getRegistration2=async(req,res)=>{
    console.log(req.query.conId,222222222222);
const conId=req.query.conId
res.render('registration2',{conId})
}

exports.postRegistration2=async(req,res)=>{

    const updateCon=await Consignments.updateOne({_id:ObjectId(req.query.conId)},{
        $set:{
            sender_name:req.body.sender_name,
            sender_address:req.body.sender_address,
            sender_city:req.body.sender_city,
            sender_pincode:req.body.sender_pincode,
            sender_number:req.body.sender_number,
            sender_email:req.body.sender_email,
            sender_gst:req.body.sender_gst,
            receiver_name:req.body.receiver_name,
            receiver_address:req.body.receiver_address,
            receiveer_city:req.body.receiveer_city,
            receiver_pincode:req.body.receiver_pincode,
            receiver_number:req.body.receiver_number,
            receiver_email:req.body.receiver_email,
            receiver_gst:req.body.receiver_gst
        }
    })
    res.redirect('/consignment-registration')
    
}
exports.getConsignment=async(req,res)=>{
  const regDetails=await Consignments.find({userId:ObjectId(req.session.user._id)})
  console.log(regDetails[0].eway.date.length)
    res.render('consignment-report',{regDetails})
}

exports.downloadConsignment=async(req,res)=>{
    const consignmentDetails=await Consignments.findOne({_id:ObjectId(req.query.conId)})
    const userDetails=await Users.findOne({_id:ObjectId(req.session.user._id)})
res.render('download',{consignmentDetails,userDetails})
}

exports.getConsignmentDetails=async(req,res)=>{
    res.render('consignment-details');
}

exports.postConsignmentDetails=async(req,res)=>{
    const consignment=await Consignments.findOne({_id:req.body.conId})
}
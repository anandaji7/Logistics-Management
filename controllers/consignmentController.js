const Consignments=require('../models/consignments')
const ObjectId=require('mongoose').Types.ObjectId

exports.getRegistration=(req,res)=>{
    res.render('consignment-registration')
}

exports.postRegistration=async(req,res)=>{
    const regDetails=new Consignments({
        docno:req.body.docno,
        pincode:req.body.pincode,
        center:req.body.center,
        sender_name:req.body.sender_name,
        sender_address:req.body.sender_address,
        sender_city:req.body.sender_city,
        sender_pincode:req.body.sender_pincode,
        receiver_name:req.body.receiver_name,
        receiver_address:req.body.receiver_address,
        receiveer_city:req.body.receiveer_city,
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
        content:req.body.content,
        sender_gst:req.body.sender_gst,
        is_sez:req.body.is_sez,
        is_eway:req.body.is_eway,
        eway:req.body.eway,
        payment_mode:req.body.payment_mode,
        charges:req.body.charges,
        cod_charge:req.body.cod_charge,
        sgst:req.body.sgst,
        cgst:req.body.cgst,
        igst:req.body.igst,
        cess_kfc:req.body.cess_kfc,
        freight:req.body.freight,
        sender_whatsapp:req.body.sender_whatsapp,
        receiver_whatsapp:req.body.receiver_whatsapp,
        pan_number:req.body.pan_number,
        sender_email:req.body.sender_email,
        receiver_email:req.body.receiver_email,
        userId:ObjectId(req.session.user._id),
        date: new Date(),
        scan_status:true
    })
    const saveReg=await regDetails.save()
    res.redirect('/consignment-registration')
}

exports.getConsignment=async(req,res)=>{
  const regDetails=await Consignments.find({userId:ObjectId(req.session.user._id)})
    res.render('consignment-report',{regDetails})
}

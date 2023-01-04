const Consignments=require('../models/consignments')
const ObjectId=require('mongoose').Types.ObjectId
const Users=require('../models/users')

exports.getTrack=(req,res)=>{
res.render('enterTrack')
}

exports.postTrack=async(req,res)=>{
  const info=await Consignments.findOne({docno:req.body.conId})
  if(info){
  const userInfo=await Users.findOne({_id:ObjectId(info.userId)})
  res.render('track',{info,userInfo}) 
  }else{
    req.session.message={
      type:'red', 
      message:'Invalid document number'
    }
    res.redirect('/track')
  }
}


   
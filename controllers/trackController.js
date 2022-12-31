const Consignments=require('../models/consignments')
const ObjectId=require('mongoose').Types.ObjectId
const Users=require('../models/users')

exports.getTrack=(req,res)=>{
res.render('enterTrack')
}

exports.postTrack=async(req,res)=>{
  const info=await Consignments.findOne({docno:req.body.conId})
  const userInfo=await Users.findOne({_id:ObjectId(info.userId)})
  res.render('track',{info,userInfo}) 
}
   
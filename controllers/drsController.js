const Users=require('../models/users')
const DRS=require('../models/drs')
const Inscan=require('../models/inscan')
const ObjectId=require('mongoose').Types.ObjectId
exports.getDRS=async(req,res)=>{
const users=await Users.findOne({_id:req.session.user._id})
const drs= await DRS.find({userId:ObjectId(req.session.user._id)})
res.render('DRS',{users,drs})
}

exports.postDRS=async(req,res)=>{
    const docs=req.body.docno.split(' ')
    console.log(req.body.drsno);
    const saveDrs= new DRS({
        drsno:req.body.drsno,
        date:Date.now(),
        area:req.body.area,
        delivery:req.body.delivery,
        pincode:req.body.pincode,
        docs:docs,
        userId:ObjectId(req.session.user._id)
    })
    const drs=await saveDrs.save()
    res.redirect('/DRS')
}

exports.getDRSReport=async(req,res)=>{
    res.render('DRS-report')
}

exports.getDRSView=async(req,res)=>{
    const drsno=parseInt(req.query.drsno)
    const drs=await DRS.aggregate([
        {$match:{
            drsno:drsno
        }},
        {
            $lookup:{
                from:'consignments',
                localField:'docno',
                foreignField:'docs',
                as:'info'
            }
        },
        {
            $unwind:'$info'
        }
    ])
    res.render('DRS-view',{drs})
}
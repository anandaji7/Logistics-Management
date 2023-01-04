const Users=require('../models/users')
const DRS=require('../models/drs')
const Inscan=require('../models/inscan')
const Consignments=require('../models/consignments')
const ObjectId=require('mongoose').Types.ObjectId
const Delivery=require('../models/delivery')

exports.getDRS=async(req,res)=>{
const users=await Users.findOne({_id:req.session.user._id})
const boysDetails=await Delivery.find({hub:ObjectId(req.session.user._id)})
const drs= await DRS.find({userId:ObjectId(req.session.user._id)})
res.render('DRS',{users,drs,boysDetails})
}

exports.postDRS=async(req,res)=>{
    const docs=req.body.docno.split(' ')
    let isdocs=true
    let wrongCon=''
    for(let i=0;i<docs.length;i++){
        const validCon=await Consignments.findOne({docno:docs[i]})
        if(!validCon){
         isdocs=false
          wrongCon=docs[i]
        }
    }
    if(isdocs){
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
}else{
    req.session.message={
        message:`Invalid Document Number ${wrongCon}`
    }
    res.redirect('/DRS')
}
}

exports.getDRSReport=async(req,res)=>{
    res.render('DRS-report')
}

exports.getDRSView=async(req,res)=>{
    const drsno=parseInt(req.query.drsno)
    const drs=await DRS.findOne({drsno:drsno})
    const boydetail=await Delivery.findOne({_id:ObjectId(drs.delivery)})
    const cons=[]
    console.log(drs,'drs');
    for(let i=0;i< drs.docs.length; i++){
        const con=await Consignments.findOne({docno:drs.docs[i]})
        cons.push(con)
    }
    res.render('DRS-view',{cons,drs,boydetail})
}

exports.getDeliveryApprove=async(req,res)=>{
    await Consignments.updateOne({_id:ObjectId(req.params.id)},{
       $set:{approved:true}
    })

    await Inscan.deleteOne({conId:ObjectId(req.params.id)})
    res.redirect('/DRS-view/?drsno='+req.params.drsno)
   }
const Outscan=require('../models/outscan')
const Users=require('../models/users')
const Consignments=require('../models/consignments')
const Inscan=require('../models/inscan')
const ObjectId=require('mongoose').Types.ObjectId

exports.postOutscan=async(req,res)=>{
    const userInfo=await Users.findOne({_id:ObjectId(req.session.user._id)})
    const nos=req.body.docno.split(" ")
    for(let i=0;i<nos.length;i++){
        const isdoc=await Consignments.findOne({docno:nos[i]})
        if(isdoc){
           if(isdoc.scan_status){
            const newOutscan=new Outscan({
                docno:nos[i],
                conId:ObjectId(isdoc._id),
                userId:ObjectId(req.session.user._id),
                to_id:ObjectId(req.body.userId),
                date:new Date,
                missing:true
            })
            const saveOutscan=await newOutscan.save()
            await Consignments.updateOne(
                {_id:ObjectId(isdoc._id)},{
                    $set:{
                        scan_status:false 
                    },
                    $push:{
                        history:{
                            date:new Date,
                            scan:"Outscan",
                            location:`Outscan from ${userInfo.userId}`
                        }
                    }
                })
                await Inscan.deleteOne({
                  userId:ObjectId(req.session.user._id),
                  conId:ObjectId(isdoc._id)
                })

           }else{
            console.log('error consignment scan_status is false not in stock or already outscanned');
           }

        }else{
            console.log('error doc is not registered');
            req.session.message={
                message:`Invalid Document number ${nos[i]}`
            }
        }
    }

    res.redirect('/outscan')
}

exports.getOutscan=async(req,res)=>{
    const users=await Users.find({})
    const ismissing=await Outscan.aggregate([
        {
            $match: {
                    'userId':ObjectId(req.session.user._id),
                    'missing':true
                    }
            
        },{
            $lookup:{
                from: 'consignments',
                localField: 'conId',
                foreignField: '_id',
                as: 'result'
              }
        },{
            $unwind:{
                path:'$result'
              }
        }
    ])
    res.render('outscan',{users,ismissing})
}

exports.getMissing=async(req,res)=>{
    const ismissing=await Outscan.aggregate([
        {
            $match: {
                    'to_id':ObjectId(req.session.user._id),
                    'missing':true
                    }
            
        },{
            $lookup:{
                from: 'consignments',
                localField: 'conId',
                foreignField: '_id',
                as: 'result'
              }
        },{
            $unwind:{
                path:'$result'
              }
        },{
            $lookup:{
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'username'
              }
        },{
            $unwind:{
                path:'$username'
              }
        }
    ])

    res.render('missing-consignment',{ismissing})
   
}
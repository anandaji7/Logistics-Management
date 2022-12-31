const Outscan=require('../models/outscan')
const Consignments=require('../models/consignments')
const Users=require('../models/users')
const Inscan=require('../models/inscan')
const ObjectId=require('mongoose').Types.ObjectId

exports.getinscan=async(req,res)=>{
    const ismissing=await Inscan.aggregate([
        {
            $match: {
                    'userId':ObjectId(req.session.user._id)
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

    res.render('inscan',{ismissing})
}

exports.postInscan=async(req,res)=>{
    const nos=req.body.docno.split('')
    for(let i=0;i<nos.length;i++){
        const isinscan=await Outscan.findOne({to_id:ObjectId(req.session.user._id),docno:nos[i]})
         if(isinscan){ 
            const userInfo=await Users.findOne({_id:ObjectId(req.session.user._id)}) 
                    await Outscan.deleteOne({
                        to_id:ObjectId(req.session.user._id),
                        docno:nos[i] 
                    })
                    await Consignments.updateOne
                    ({_id:ObjectId(isinscan.conId)},{
                        $set:{
                            scan_status:true
                        },
                        $push:{
                            history:{
                                date:new Date,
                                scan:"Inscan",
                                location:`Inscan from ${userInfo.userId}`
                            }
                        }
                    })
                    const newinscan=new Inscan({
                        docno:isinscan.docno,
                        conId:isinscan.conId,
                        userId:req.session.user._id,
                        date:new Date
                    }) 
                    await newinscan.save()         
        }else{
            console.log('error doc is not outscanned to this center');
            req.session.message={
                message:'Invalid Doc No.'
            }
        } 
    }
    res.redirect('/inscan')
}
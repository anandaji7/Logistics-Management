const Track=require('../models/track')
const consignment=require('../models/consignments')
const Users=require('../models/users')
const Inscan=require('../models/inscan')
const ObjectId=require('mongoose').Types.ObjectId

exports.getinscan=async(req,res)=>{
    const details=await Track.aggregate([
           {
            $match:{track$userId:req.session.userId}
        },
        {
            $lookup:{
                
                    from: 'consignment',
                    localField: 'conId',
                    foreignField:' _id',
                    as: 'docs'
                  
            }
            
        },
        {
            $unwind:'$track'
        },
        // {
        //     $match:{track$userId:req.session.userId}
        // },
        {
            $match:{track$status:'inscan'}
        }
        

    ])
   // const details=await Track.find({track$userId:req.session.user.userId})
    console.log(details)
    console.log(req.session.user.userId);
    res.render('inscan',{details})
}

exports.postInscan=async(req,res)=>{
    const isAlreadyDoc=await Inscan.findOne({docno:req.body.docno})
    console.log(isAlreadyDoc);
    if(isAlreadyDoc){

    }else{
        console.log('doc already inscanned');
    }
    res.redirect('/inscan')
}
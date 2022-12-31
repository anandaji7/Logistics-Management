const Consignments=require('../models/consignments')
const Inscan=require('../models/inscan')
const ObjectId=require('mongoose').Types.ObjectId


exports.getInventory=async(req,res)=>{
    const regCon=await Consignments.find({userId:ObjectId(req.session.user._id),scan_status:true})
    const inscannedCon=await Inscan.aggregate([
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
    res.render('inventory',{regCon,inscannedCon})
}
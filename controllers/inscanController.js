const Outscan=require('../models/outscan')
const Consignments=require('../models/consignments')
const Users=require('../models/users')

const ObjectId=require('mongoose').Types.ObjectId

exports.getinscan=async(req,res)=>{
   

    res.render('inscan')
}

exports.postInscan=async(req,res)=>{
    const nos=req.body.docno.split('')
    for(let i=0;i<nos.length;i++){
        const isinscan=await Outscan.findOne({to_id:ObjectId(req.session.user._id),docno:nos[i]})
         if(isinscan){  
                    await Outscan.updateOne(
                        {_id:ObjectId(isinscan._id)},{
                            $set:{
                                missing:false
                            }
                        }
                    )
                    await Consignments.updateOne
                    ({_id:ObjectId(isinscan.conId)},{
                        $set:{
                            scan_status:true
                        }
                    })          
        }else{
            console.log('error doc is not outscanned to this center');
        }
    }
    res.redirect('/inscan')
}
const mongoose=require('mongoose')
const DrsSchema=mongoose.Schema({
    drsno:{type:Number},
    area:{type:String},
    delivery:{type:mongoose.Types.ObjectId,ref:'delivery'},
    pincode:{type:Number},
    docs:{type:Array},
    date:{type:Date} ,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    image:{type:String},
    status:{type:String}   
})
module.exports=mongoose.model('Drs',DrsSchema)
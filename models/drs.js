const mongoose=require('mongoose')
const DrsSchema=mongoose.Schema({
    drsno:{type:Number},
    area:{type:String},
    delivery:{type:String},
    pincode:{type:Number},
    docs:{type:Array},
    date:{type:Date} ,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },   
})
module.exports=mongoose.model('Drs',DrsSchema)
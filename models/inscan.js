const mongoose=require('mongoose')
const InscanSchema=new mongoose.Schema({
    docno:{type:String},
    conId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Consignments'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    date:{
        type:Date
    }
})
module.exports=mongoose.model('Inscan',InscanSchema)
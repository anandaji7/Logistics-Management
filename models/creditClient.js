const mongoose=require('mongoose')

const CreditClientSchema=mongoose.Schema({
    clientName:{type:String},
    gst:{type:Number},
    contact:{type:Number},
    address:{type:String},
    district:{type:String},
    state:{type:String},
    block:{type:Boolean,default:false}
})
module.exports=mongoose.model('CreditClient',CreditClientSchema)
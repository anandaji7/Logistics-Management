const mongoose=require('mongoose')

const DeliverySchema=mongoose.Schema({
    name:{type:String},
    userId:{type:String},
    password:{type:String},
    hub:{type:mongoose.Types.ObjectId,ref:'users'}
})

module.exports=mongoose.model('Delivery',DeliverySchema)
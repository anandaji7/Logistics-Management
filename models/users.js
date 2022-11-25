const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    userId:{type:String ,required:true},
    password:{type:String,required:true},
    branchCode:{type:String,required:true},
    areas:Array,
    deleveryBoys:Array,
    pincodes:Array


}
,{
    timestamps:true
})
module.exports=mongoose.model('User',UserSchema)
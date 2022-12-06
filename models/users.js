const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    userId:{type:String ,required:true},
    password:{type:String,required:true},
    branchCode:{type:String,required:true},
    areas:Array,
    deleveryBoys:Array,
    pincodes:Array,
    address:{type:String,required:true},
    city:{type:String,required:true}

}
,{
    timestamps:true
})
module.exports=mongoose.model('User',UserSchema)
const mongoose=require('mongoose')
const ConsignmentSchema=mongoose.Schema({
    docno:{type:String,required:true},
    pincode:{type:Number,required:true},
    center:{type:String},
    sender_name:{type:String},
    sender_address:{type:String},
    sender_city:{type:String},
    sender_pincode:{type:Number},
    receiver_name:{type:String},
    receiver_address:{type:String},
    receiveer_city:{type:String},
    receiver_pincode:{type:Number},
    type:{type:String},
    Service:{type:String},
    travel_by:{type:String},
    child_badge:{type:String},
    insured:{type:String},
    cod:{type:String},
    value:{type:Number},
    weight:{type:Number},
    description:{type:String},
    length:{type:Number},
    width:{type:Number},
    height:{type:Number},
    content:{type:String},
    sender_gst:{type:String},
    receiver_gst:{type:String},
    vol_weight:{type:Number},
    is_eway:{type:String},
    eway:{type:Object},
    payment_mode:{type:String},
    charges:{type:Number},
    cod_charge:{type:Number},
    sgst:{type:Number},
    cgst:{type:Number},
    igst:{type:Number},
    cess_kfc:{type:Number},
    freight:{type:Number},
    sender_number:{type:Number},
    receiver_number:{type:Number},
    pan_number:{type:Number},
    sender_email:{type:String},
    receiver_email:{type:String},
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    date:{
        type: Date,
        required:true
    },
    scan_status:{type:Boolean}

},{
    timestamps:true
})
module.exports=mongoose.model('Consignments',ConsignmentSchema)
const mongoose=require('mongoose')

const TrackSchema=new mongoose.Schema({
    docno:{type:String},
    conId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Consignments'
    },
    track:Array
})
module.exports=mongoose.model('Track',TrackSchema)
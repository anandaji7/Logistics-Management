test
//old inscan post code
exports.postInscan=async(req,res)=>{
     const userDetail= await Users.findOne({_id:ObjectId(req.session.user._id)})
    console.log(userDetail);
    const nos=req.body.docno.split(" ")
    for(let i=0;i<nos.length;i++){
        const isdoc=await consignment.findOne({docno:nos[i]})
        if(isdoc){
            const newTrack=new Track({
            docno:nos[i],
    conId:ObjectId(isdoc._id),
    track:[{
        status:'inscan',
        userId:userDetail.userId,
        date:new Date()
    }]
})
const savedoc=await newTrack.save()     
}else{
    console.log('doc doesnt exist');
}

   
    }
    res.redirect('/inscan')
}
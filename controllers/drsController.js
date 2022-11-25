const Users=require('../models/users')
exports.getDRS=async(req,res)=>{
const users=await Users.findOne({_id:req.session.user._id})
res.render('DRS',{users})
}
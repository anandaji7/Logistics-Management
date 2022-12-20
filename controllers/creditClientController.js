const CreditClient=require('../models/creditClient')
const ObjectId=require('mongoose').Types.ObjectId

exports.postRegisterClient=async(req,res)=>{
    const creditClient=req.body
    const newCreditClient=new CreditClient(creditClient)
    try {
        await newCreditClient.save()
        res.redirect('/admin/add-client')
    } catch (error) {
        console.log(error);
    }
}

exports.getCreditClientLists=async(req,res)=>{
   const clients=await CreditClient.find({})
   res.render('clients',{clients})
}

exports.getEditClient=async(req,res)=>{
    const client=await CreditClient.findOne({_id:ObjectId(req.query.id)})
    res.render('edit-client',{client})
}
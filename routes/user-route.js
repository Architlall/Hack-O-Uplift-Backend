const express = require('express');
const userrouter = express.Router()
const userReceiver = require('../models/User');
//Reciever Dashboard
userrouter.get('/receiver/profiles',async (req,res)=>{
    await userReceiver.find()
    .then((result)=>{
        console.log(JSON.stringify(result))
        res.json(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})
//Form for Reciever
userrouter.get('/receiver',(req,res)=>{
    res.render('form')
})
//Fill in details for blood request
userrouter.post('/receiver',(req,res)=>{
    const newRequest = new userReceiver(req.body)
    newRequest.save()
    .then((result)=>{
        res.json(result)
        console.log(JSON.stringify(result))
        //console.log('Request Registered')
    })
    .catch((err)=>{
        console.log(err)
    })

})
//Get details of specific reciever
userrouter.get('/receiver/:id',(req,res)=>{
    const id = req.params.id
    userReceiver.findById(id)
    .then((result)=>{
            res.json(result)
            console.log(JSON.stringify(result))
            //Details of a specific request
            console.log(result)
        })
        .catch((err)=>{
            console.log(err);
        })
})
//Edit Request Form
userrouter.get('/receiver/edit/:id',async (req,res)=>{
    const data = await userReceiver.findOne({_id: req.params.id})
    if(!data){
        res.status(404).json({"error":"404"})
    } else {
        res.json(data)
        console.log(JSON.stringify(data))
        res.render('form')
    }
})
//Update Request Form
userrouter.put('/receiver/edit/:id',async(req,res)=>{
    let data = await userReceiver.findById(req.params.id)
    if(!data){
        res.status(404).json({"error":"404"})
    } else {
        try{
            data = await userReceiver.findOneAndUpdate({_id: req.params.id},req.body,{
                new: true,
                runValidators: true
            })
            res.redirect('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }  
})
module.exports = userrouter;
const express = require('express');
const userrouter = express.Router()
const userReceiver = require('../models/User');

//Form for a user to fill up
userrouter.get('/postsawo',(req,res)=>{
    //pass the form from the front end
    res.render('form')
})
//POST Request to be filled as a details form of the user after sawo check up (Requires Axios to send uid data in body)
userrouter.post('/postsawo',async(req,res)=>{
    const newRequest = new userReceiver(req.body)
    //This checks if the user exists or not based on SAWO Uid
    const checkuser = await userReceiver.find({uid: req.body.uid})
    //If not present then saves all the details given in the User.js Schema in DB
    if(checkuser.length!=0){
        newRequest.save()
        .then((result)=>{
            //Passes Json data as well as directs to dashboard
            console.log(JSON.stringify(result))
            res.redirect('/dashboard')
            //console.log('user Registered')
        })
        .catch((err)=>{
            console.log(err)
        })
    } else {
        //If user exists then directly pass the Json data n redirect as well
        const data = JSON.stringify(checkuser)
        console.log(data);
        res.redirect('/dashboard');
    }

})

//This is unused routes don't bother about these if required then shall b added.

/* //Reciever Dashboard
userrouter.get('/receiver/profiles',async (req,res)=>{
    await userReceiver.find()
    .then((result)=>{
        console.log(JSON.stringify(result))
        res.json(result)
    })
    .catch((err)=>{
        console.log(err)
    })
}) */
/* //Get details of specific reciever
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
}) */
module.exports = userrouter;
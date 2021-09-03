const express = require('express');
const router = express.Router();
const bloodReceiver = require('../models/receiver');
//Reciever Dashboard
router.get('/dashboard',async (req,res)=>{
    await bloodReceiver.find({uid: req.body.uid})
    .then((result)=>{
        result.forEach(async (data)=>{
            console.log(data.status)
            if(data.status){
                await bloodReceiver.findByIdAndRemove({_id: data. id})
            }
        })
        console.log(JSON.stringify(result))
        res.json(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})
//Form for Reciever
router.get('/bloodrequest',(req,res)=>{
    res.render('form')
})
//Fill in details for blood request
router.post('/bloodrequest',(req,res)=>{
    const newRequest = new bloodReceiver(req.body)
    console.log(req.body)
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
//Pending Requests Board
/*
router.get('/pendingbloodrequests',async (req,res)=>{
    await bloodReciever.find()
    .then((result)=>{
        console.log(result)

        //res.render('pending',{reqs:result})
    })
    .catch((err)=>{
        console.log(err)
    })
})
*/
//Get details of specific blood request
router.get('/bloodrequest/:id',(req,res)=>{
    const id = req.params.id
    bloodReceiver.findById(id)
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
router.get('/bloodrequest/edit/:id',async (req,res)=>{
    const report = await bloodReceiver.findOne({_id: req.params.id})
    if(!report){
        res.status(404).json({"error":"404"})
    } else {
        res.json(report)
        console.log(JSON.stringify(report))
        res.render('form')
    }
})
//Update Request Form
router.put('/bloodrequest/edit/:id',async(req,res)=>{
    let report = await bloodReceiver.findById(req.params.id)
    if(!report){
        res.status(404).json({"error":"404"})
    } else {
        try{
            report = await bloodReceiver.findOneAndUpdate({_id: req.params.id},req.body,{
                new: true,
                runValidators: true
            })
            res.redirect('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }  
})
//Delete request Form
router.get('/bloodrequest/delete/:id',async(req,res)=>{
    let report = await bloodReceiver.findById(req.params.id)
    console.log(report)
    if(!report){
        console.log("Not found")
        res.status(404).json({"error":"404"})
    } else {
        console.log("Going to Delete")
        report = await bloodReceiver.findByIdAndDelete({_id: req.params.id})
        res.redirect('/dashboard')
    }
})
module.exports = router;
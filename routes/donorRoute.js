const express = require('express');
const router = express.Router();
const bloodDonor = require('../models/donor');
//const bloodReceiver = require('../models/receiver')
router.get('/donor/home',async (req,res)=>{
    await bloodReceiver.find()
    .then((result)=>{
        
        result.forEach(async (data)=>{
            if(data.address.city == donor.address.city)
            res.json(result)
            console.log(JSON.stringify(result))
            
            console.log(result)
        })
      
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get('/donor/request/:id',async (req,res)=>{
    await bloodReceiver.findById(req.params.id)
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result); //send all details to frontend where map will be rendered using code inside maps.js

        //   @shubham @shruti use following snippet in html file to fetch maps api and add api key to env
        //     <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCK8BVhtGeIpBytmR4EAi2DDQuRCPdbNSc&callback=initMap"></script>
        //     <script src="maps.js"></script>

    })       
})

module.exports = router;



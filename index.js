const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const router = require('./routes/routes');
const userrouter = require('./routes/user-route');
const donorrouter = require('./routes/donorRoute')
require('dotenv').config();
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ydfmd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(URI,{useNewUrlParser: true, useUnifiedTopology: true})
 .then((result)=> 
    app.listen((process.env.PORT),function(){
        console.log(`Server started at http://localhost:${process.env.PORT}`)
    })
  )
 .catch((err)=>console.log(err));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())

//Method Override
app.use(methodOverride((req,res)=>{
  if(req.body && typeof req.body==='object' && '_method' in req.body){
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

app.use(router);
app.use(userrouter);
app.use(donorrouter);
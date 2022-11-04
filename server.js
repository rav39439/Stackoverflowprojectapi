const express = require("express");
const app = express();
const server = require('http').createServer(app);
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userRoute = require("./src/routes/users");

require('dotenv').config()


const cors=require('cors')


mongoose.connect(process.env.MONGO_KEY,{useNewUrlParser:true , useUnifiedTopology:true}).then( ()=>
    console.log("connection successful")
).catch((err)=>console.log(err))


const conn = mongoose.createConnection('mongodb+srv://Ravkkrrttyy:xDKSBRRDI8nkn13w@cluster1.2pfid.mongodb.net/reactproject=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology: true} );



app.use(cors(), function(req, res, next) {
    res.header("Access-Control-Allow-Origin","http://localhost:3000"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
  app.use(express.json());

 
  
  
  

  app.use("/api/users", userRoute);

  server.listen(8800,function(){
    console.log("connected")
  
  })


  module.exports = process.env;
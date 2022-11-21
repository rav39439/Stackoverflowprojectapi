const express = require("express");
const app = express();
const server = require('http').createServer(app);
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userRoute = require("./src/routes/users");
const questionRoute = require("./src/routes/Questions");
const answerRoute = require("./src/routes/Answers");

require('dotenv').config()


const cors=require('cors')
// const io = require('socket.io')(server, {cors: {origin: "*",
// allowedHeaders: ["my-custom-header"],
// credentials: true
// }});
var io=require("socket.io")(server, {
  cors: {
    origin:"https://stackoverflowfrontend.netlify.app",
    credentials: true
  }
})


mongoose.connect(process.env.MONGO_KEY,{useNewUrlParser:true , useUnifiedTopology:true}).then( ()=>
    console.log("connection successful")
).catch((err)=>console.log(err))


const conn = mongoose.createConnection(process.env.MONGO_KEY,{ useNewUrlParser: true ,useUnifiedTopology: true} );



// app.use(cors(), function(req, res, next) {
//     res.header("Access-Control-Allow-Origin","https://employeemangement.netlify.app"); // update to match the domain you will make the request from
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });
  

// app.use(cors(), function(req, res, next) {
//     res.header("Access-Control-Allow-Origin","http://localhost:3000/"); // update to match the domain you will make the request from
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });
  
app.use(cors(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin","https://stackoverflowfrontend.netlify.app"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


  app.use(express.json());

 
  
  
  

  app.use("/api/users", userRoute);
  app.use("/api/questions", questionRoute);
  app.use("/api/answer", answerRoute);



  let sockets=[]


  io.on('connection', (socket) => { 
    socket.on("online",function(data){
      //if(!sockets.includes(user)){
        console.log(data)
        socket.name = data?.result?.name;
        sockets[data?.result?._id] = socket.id;
      //socket.id=user.username
      //}
        //sockets.push(user.username)
        console.log(sockets)
        socket.emit('online',"Welcome"+"  "+data?.result?.name)



    })

    socket.on("message",function(message,id){
     
      console.log(sockets[id])

      io.to(sockets[id]).emit("partner message",message)
      socket.emit("mymessage",message)
    })

  })




  server.listen(process.env.PORT||8800,function(){
    console.log("connected")
  
  })


  module.exports = process.env;
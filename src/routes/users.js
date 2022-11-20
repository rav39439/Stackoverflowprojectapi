const NUser = require("../model/NUser");
const router = require("express").Router();
const nodemailer=require('nodemailer')
const path = require('path')
const sendgridtransport=require('nodemailer-sendgrid-transport')
const dotenv = require("dotenv");
const {login, signup}=require('../controllers/auth')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const {getAllUsers}=require('../controllers/users')
const {pushmessage,getmessages}=require('../controllers/Messages')
// var transporter=nodemailer.createTransport(sendgridtransport({
    
  

//   auth:{
//     api_key:process.env.API_KEY,
  

// },
 

 
// }))


// router.post("/postuser",async (req, res) => {


//     const newUser = new NUser({
//       username:req.body.username,
//       phoneno:req.body.phoneno,
//        Email:req.body.Email,
//       Hobby:req.body.Hobby,
//       selected:req.body.selected,
     
//     });
//       try{
//   const Usersaved=await newUser.save()
//   const users = await NUser.find();
//       res.status(200).json(users.reverse());
//       }
//       catch(err){
//          // res.status(400).json("product cannot be posted")
//          console.log(err)
//       }
  
//   });


  

//   // router.post("/getuser",async (req, res) => {
//   //   const userId = req.body.userid;
//   //   const username = req.body.username;
//   //   console.log(userId)
//   //  console.log(username)
//   //   try {
//   //     const myuser=await User.findOne({
//   // $and:[{
//   //   "_id":ObjectId(req.body.userid),
  
//   // },{
//   //   "username":req.body.username
//   // }]
       
//   //     })
//   //     res.status(200).json(myuser);
//   //     //console.log(myuser)
//   //   } catch (err) {
//   //     res.status(500).json(err);
//   //   }
//   // });
  
  
//   router.get("/getdata", async (req, res) => {
//     // if (req.user.isAdmin) {
//        try {
//          const users = await NUser.find();
//          res.status(200).json(users.reverse());
//        } catch (err) {
//          res.status(500).json(err);
//        }
     
//    });



//    router.delete("/deleteuser/:id", async (req, res) => {
  
//     try {
//       await NUser.findByIdAndDelete(req.params.id);



//    const users = await NUser.find();
//       res.status(200).json(users.reverse());
//     } catch (err) {
//       res.status(500).json(err);
//     }
  
// });

// router.put("/updateuser/:id", async (req, res) => {
 
//   try {
//     const updatedUser = await NUser.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );


//   const users = await NUser.find();
//       res.status(200).json(users.reverse());
//   } catch (err) {
//     res.status(500).json(err);
//   }

// });




// router.post('/senddata',(req, res) => {




// let jsondata=JSON.stringify(req.body)
// console.log(jsondata)
// var mailOptions={
//   from:"rav39439@gmail.com",
//   to:"info@redpositive.im",
//   subject:"Your data",
//   html:`<h2>Data of required employees</h2>
//   <h4>Data as required</h4>
//   <p>${jsondata}</p>
//   `
// }
// transporter.sendMail(mailOptions,function(error,info){

//   if(error){
//      console.log(error)
//   }else{
     
//       console.log("verificartion email is sent")
     

//   }
// })
// res.json("data is sent to your mail in json format. Check your mail")


// })








//   module.exports = router;


router.post('/signup',signup)
router.post('/login',login)
router.get('/getAllUsers',getAllUsers)
router.put('/messages',pushmessage)
router.get('/usermessages/:id',getmessages)
module.exports=router


const User=require('../model/NUser')
const mongoose=require('mongoose')
const ObjectId=require('mongodb').ObjectId

const pushmessage=async(req,res)=>{

  console.log("sdfffffffffffffffffff")

  console.log(req.body)

//var id = mongoose.Types.ObjectId();

//var restaurantid = mongoose.Types.ObjectId(req.body.restaurantid);
try {
const updatedUser = await User.findOneAndUpdate({
  "_id":req.body.userid
},{
    $push:{
      "messages":{
        "from":req.body.userid,
        "to":req.body.partnerid,
        "message":req.body.information,
        "time":req.body.time,
        "name":req.body.name,
        "partnername":req.body.partnername
      }
    }

})
const Userpartner = await User.findOneAndUpdate({

  "_id":ObjectId(req.body.partnerid)
},{
    $push:{
      "messages":{
        "from":req.body.userid,
        "to":req.body.partnerid,
        "message":req.body.information,
        "time":req.body.time,
        "name":req.body.name,
        "partnername":req.body.partnername
      }
    }

})

const updateddata =  User.findOne({
    "_id":ObjectId(req.body.userid)


   },function(err,data){
    res.status(200).json(data.messages);
    console.log(data.messages)
   })

      
} catch (err) {
res.status(500).json(err);
}
}


const getmessages=async(req,res)=>{
console.log(req.params.id)
const updateddata =await User.findOne({
  "_id":ObjectId(req.params.id)


 })
res.status(200).json(updateddata.messages)
console.log(updateddata)
}




module.exports={pushmessage,getmessages}


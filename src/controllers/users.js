const express=require('express')
const NUser = require("../model/NUser");

 const getAllUsers=async(req,res)=>{
    try{

        const allUsers=await NUser.find();
        const allUserDetails=[]
        allUsers.forEach(users=>{
            allUserDetails.push({_id:users._id, name:users.name,about:users.about,tags:users.tags,joinedOn:users.joinedOn})
        })
        res.status(200).json(allUserDetails)
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
}
module.exports={getAllUsers}
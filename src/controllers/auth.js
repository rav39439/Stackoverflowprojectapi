
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const NUser = require("../model/NUser");

const signup=async(req,res)=>{
    console.log(req.body)
   const {name,email,password,phoneno}=req.body;
   try{
    const existinguser=await NUser.findOne({email})
    if(existinguser){
        return res.status(404).json({message:"user already exist"})
    }
    const hashedpassword=await bcrypt.hash(password,12)
    const newuser=await NUser.create({name,email,password:hashedpassword,tags:null,about:null,phoneno:phoneno})
    const token=jwt.sign({email:newuser.email,id:newuser._id},"test",{expiresIn:'1h'})
    res.status(200).json({result:newuser,token})
   } 
   catch(err){
    res.status(500).json("something wrong")
   }
}



 const login=async(req,res)=>{
const {email,password}=req.body;

try{
    const existinguser=await NUser.findOne({email})
    if(!existinguser){
        return res.status(404).json({message:"User do not exist"})
    }
    const isPasswordCrt=await bcrypt.compare(password,existinguser.password)
    if(!isPasswordCrt){
        return res.status(400).json({message:"Invalid credential"})
    }
const token=jwt.sign({email:existinguser.email,id:existinguser._id},"test",{expiresIn:'1h'})
console.log(token)
res.status(200).json({result:existinguser,token})
} catch(err){
    res.status(404).json({message:"something went wrong"})
}
}


 const login2=async(req,res)=>{
const {phonenumber}=req.body;
console.log(phonenumber)
try{
    const existinguser=await NUser.findOne({
        
       "phoneno":phonenumber
    
    })
    if(!existinguser){
        return res.status(404).json({message:"User do not exist"})
    }
    // const isPasswordCrt=await bcrypt.compare(password,existinguser.password)
    // if(!isPasswordCrt){
    //     return res.status(400).json({message:"Invalid credential"})
    // }
const token=jwt.sign({email:existinguser.email,id:existinguser._id},"test",{expiresIn:'1h'})
console.log(token)
res.status(200).json({result:existinguser,token})
} catch(err){
    res.status(404).json({message:"something went wrong"})
}
}
module.exports={signup,login,login2}
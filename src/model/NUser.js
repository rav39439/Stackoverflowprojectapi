const mongoose=require('mongoose')


const ClientSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    about:{type:String},
    tags:{type:String},
    joinedOn:{type:Date,default:Date.now},
    messages:{type:Array}
})
module.exports=mongoose.model("NUser",ClientSchema)
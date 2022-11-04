const mongoose=require('mongoose')


const ClientSchema=new mongoose.Schema({
    username:{type:String,required:true},
    phoneno:{type:String,required:true},
    Email:{type:String,required:true},
    Hobby:{type:String,required:true},
    selected:{type:String}
},{
    timestamps:true
})
module.exports=mongoose.model("NUser",ClientSchema)
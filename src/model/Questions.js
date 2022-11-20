const mongoose=require('mongoose')
const QuestionSchema= mongoose.Schema({
    questionTitle:{type:String, required:"Question must have title"},
    questionBody:{type:String,required:"Question must have a body"},
    questionTags:{type:[String],required:"Question must have tags"},
    noOfAnswers:{type:Number,default:0},
    upVote:{type:[String],default:[]},
    downVote:{type:[String],default:[]},
    userPosted:{type:String,required:"Quesstion must have a author"},
    userId:{type:String},
    postedOn:{type:Date,default:Date.now},
    answer:[{
        answerBody:{type:String},
        userAnswered:{type:String},
        userId:{type:String},
        answeredOn:{type:Date,default:Date.now}
    }]
})
//export default mongoose.model("Question",QuestionSchema)
module.exports=mongoose.model("Question",QuestionSchema)
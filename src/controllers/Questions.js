const mongoose=require('mongoose')
const Questions=require('../model/Questions')

const Question=require('../model/Questions')
const AskQuestion=async(req,res)=>{
    const postQuestionData=req.body;
    const postQuestion=new Question({
        ...postQuestionData,userId:req.userId
    })
    
    try{
        await postQuestion.save();
        res.status(200).json("Posted new question successfully")

    } catch(err){
        console.log(err)
        res.status(400).json("Couldn't post a new question")
    }
}

const getAllQuestions=async(req,res)=>{
   

    try{
        const questionList=await Question.find();

      
        res.status(200).json(questionList)

    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

const deleteQuestion=async(req,res)=>{
    const {id:_id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){

       

        return res.status(404).send("question unavailabe..")

    }
    try{
        console.log("question removed")

        await Question.findByIdAndRemove(_id);
         res.status(200).json({message:"Successfully deleted"})
    }  catch(err){
        res.status(404).json({message:err.message})
    }
}
const voteQuestion=async(req,res)=>{
    const {id:_id}=req.params
    const {value,userId}=req.body
   
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable..')
    }
    try{
        const question=await Question.findById(_id)
const upIndex=question.upVote.findIndex((id)=>id==String(userId))
const downIndex=question.downVote.findIndex((id)=>id==String(userId))
console.log(req.body)

if(value=='upvote'){
    if(downIndex!=-1){


        question.downVote=question.downVote.filter((id)=>id!=String(userId))
    }
        if(upIndex==-1){
        
            question.upVote.push(userId)
        }
        else{

            question.upVote=question.upVote.filter((id)=>id!=String(userId))
        }

}
if(value=='downvote'){
    if(upIndex!=-1){

        console.log("upvoted")

        question.upVote=question.upVote.filter((id)=>id!=String(userId))
    }
        if(downIndex==-1){

            question.downVote.push(userId)
        }
        else{
            question.downVote=question.downVote.filter((id)=>id!=String(userId))
        }

}

await Questions.findByIdAndUpdate(_id,question)
res.status(200).json({message:"Voted successfully"})
    }
    catch(err){
        res.status(500).json({message:"id not found"})
    }
}

module.exports={AskQuestion,getAllQuestions,deleteQuestion,voteQuestion}
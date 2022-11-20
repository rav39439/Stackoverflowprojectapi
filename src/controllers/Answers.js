
const Questions=require('../model/Questions')
const mongoose=require('mongoose')
const ObjectId=require('mongodb').ObjectId


const postAnswer=async(req,res)=>{
    const {id:_id}=req.params;
    const {noOfAnswers,answerBody,userAnswered,userId}=req.body

    if(!mongoose.Types.ObjectId.isValid(_id)){

      
        return res.status(404).send('Question unavalble..')

    }
    updateNoOfQuestions(_id,noOfAnswers)
    try{
        const updatedQuestion=await Questions.findByIdAndUpdate(_id,{$addToSet:{'answer':[{noOfAnswers,answerBody,userAnswered,userId}]}})
        console.log(updatedQuestion)
        res.status(200).json(updatedQuestion)
       
    } catch(err){
        res.status(500).send(err)
    }
}

updateNoOfQuestions=async(_id,noOfAnswers)=>{
    try{
        await Questions.findOneAndUpdate(_id,{$set:{'noOfAnswers':noOfAnswers}})
    }catch(err){
        console.log(err)
    }
}

const deleteAnswer=async(req,res)=>{
    const {id:_id}=req.params;
    console.log(req.body)
   /// const {answerId,noOfAnswers}=req.body
    var answerid=ObjectId(req.body.answerId)
    console.log(answerid)
    // if(!mongoose.Types.ObjectId.isValid(_id)){
    //     console.log("not recognized")
    //     res.status(404).send('Questioin unavailable')
    // }
    // if(!mongoose.Types.ObjectId.isValid(answerId)){
    //     res.status(404).send('Asnser unavailable')
    // }
    //updateNoOfQuestions(_id,noOfAnswers)
    try{
        await Questions.updateOne(
            {_id},
            {$pull:{'answer':{_id:answerid}}}
        )
        res.status(200).send("ans deleted successfully")
    }
    catch(err){
        console.log(err)
    }

}

module.exports={postAnswer,deleteAnswer}
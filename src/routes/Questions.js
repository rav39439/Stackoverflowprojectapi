const express = require("express");
const router=express.Router()

const auth=require('../middleware/auth')
const {getAllQuestions,AskQuestion,deleteQuestion,voteQuestion}=require('../controllers/Questions')

router.post('/Ask',auth,AskQuestion)
router.get('/get',getAllQuestions)
router.delete('/delete/:id',deleteQuestion)
router.patch('/vote/:id',voteQuestion)
module.exports= router
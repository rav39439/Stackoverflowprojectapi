const express = require("express");

const router=express.Router()


const auth=require('../middleware/auth')
const {postAnswer,deleteAnswer}=require('../controllers/Answers')
router.patch('/post/:id',auth,postAnswer)
router.patch('/delete/:id',auth,deleteAnswer)
module.exports=router
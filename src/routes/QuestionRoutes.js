/*
  ROUTES:- /api/v1/question/add , /api/v1/question/all
*/
import express from "express"
import Question from "../services/Mongodb/models/Question"
import QuoraUser from "../services/Mongodb/models/QuoraUser"

const router = express.Router()

/*
  POST ROUTE:- /api/v1/question/add (public)
  PARAMETERS ACCEPTED:_id (userid),content(String),isAnonymous(Boolean)
*/

router.post('/add',async(req,res)=>{ 
    try{
       const {_id,content,isAnonymous=false} = req.body
       const today = new Date()
       const date =  today.getDate()+'-'+today.getMonth()+'-'+today.getFullYear()
       const question = new Question({content,userId:_id,isAnonymous,date})
       await question.save()
       const question_id = question._id
       const user = await QuoraUser.findOne({_id})
       user.questionsPosted = [...user.questionsPosted,question_id]
       const updatedUser = await QuoraUser.findOneAndUpdate({_id},user)
       return res.json({
         status:'SUCCESS',
         message:'Question Posted!',
         question
        //  updatedUser,
        //  questionsPosted:updatedUser.questionsPosted.length
         })
    }
    catch(error){
        return res.json({
            status:'FAILED',
            message:error.message
        })
    }
})

/*
  GET ROUTE:- /api/v1/question/all (public)
  getting all the questions from the database
  PARAMETERS ACCEPTED:none
*/
router.get('/all',async(req,res)=>{
  try{
    const questions = await Question.find({})
    res.json({
      status:'SUCCESS',
      message:'questions fetched successfully!',
      questions
    })
  }
  catch(error){
    res.json({
      status:'FAILED',
      message:error.message
    })
  }
})


export default router
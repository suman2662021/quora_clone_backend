// ROUTES:- /api/v1/answers/add

import express from "express";
import Answer from "../services/Mongodb/models/Answer";
import Question from "../services/Mongodb/models/Question";
import QuoraUser from "../services/Mongodb/models/QuoraUser";
import jwt from 'jsonwebtoken'

const router = express.Router()

/* POST ROUTE: /api/v1/answers/add (public)
PARAMETERS ACCEPTED: _id (userid),question_id,content
*/

router.post('/add',async(req,res)=>{
    try{
        const {_id,question,content,isAnonymous=false} = req.body // question will be question_id
        const today = new Date()
        const date = today.getDate()+'-'+today.getMonth()+'-'+today.getFullYear()
        const answer = new Answer({userId:_id,question,content,isAnonymous,date})
        await answer.save()
        const ques = await Question.findOne({question})
        ques.answers = [...ques.answers,answer]
        const update = await Question.findOneAndUpdate({question},ques)
        const user = await QuoraUser.findOne({_id})
        user.answersPosted = [...user.answersPosted,answer._id]
        await QuoraUser.findOneAndUpdate({_id},user)
        res.json({
            status:'SUCCESS',
            message:'Answer posted successfully!',
            answer
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
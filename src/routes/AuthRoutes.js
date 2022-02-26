// AUTH ROUTES: /login (public),/signup (public),/users (private, accessed only by ADMIN)

import express from 'express'
import QuoraUser from "../services/Mongodb/models/QuoraUser"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/users',async(req,res)=>{
    try{
       const users = await QuoraUser.find({});
       res.json({
           status:'SUCESS',
           message:'fetched users from db',
           users
       })
    }
    catch(error){
        res.json({
            status:'FAILED',
            message:error.message,
            users:[]
        })
    }
})

router.post('/signup',async(req,res)=>{
    try{
      const {firstName,lastName='',email,password,description=''} = req.body
    //   hashing the password by using bcrypt
     const salt = await bcrypt.genSalt(5)
     const hashedPassword = await bcrypt.hashSync(password,salt)
     const user = new QuoraUser({firstName,lastName,email,password:hashedPassword,description})
      await user.save()
      res.json({
          status:'SUCCESS',
          message:'Signup succesfull!',
          user 
      })
     }
     catch(error){
         console.log(error)
         res.json({
            status:'FAILED',
            message:error.message
        })
     }
})

router.post('/login',async(req,res)=>{
   try{
       const {email,password} = req.body
       const user = await QuoraUser.findOne({email})
       if(user){
          const passwordMatched = await bcrypt.compare(password,user.password)
          if(passwordMatched){
            //   send jwt token
              const {_id,role} = user 
              const payload = {_id,role}
              const token = jwt.sign(payload,process.env.JWT_SECRET)
              const userName = user.firstName+" "+user.lastName
              return res.json({
                  status:'SUCCESS',
                  message:'Login Successful!',
                  token,
                  user  // destructure _id of the user in the frontend
              })
            }
          return res.json({
              status:'FAILED',
              message:'INCORRECT PASSWORD',
              token:null
          })
       }
       return res.json({
           status:'FAILED',
           message:'USER NOT FOUND',
           token:null
       })
   }
   catch(error){
       res.json({
           status:'FAILED',
           message:error.message,
           token:null
       })
   }
})

export default router
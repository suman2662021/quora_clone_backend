// express server

import dotenv from "dotenv"
dotenv.config() 
import cors from 'cors'
import express from "express";
import connectDb from "./services/Mongodb/connectDb";
import AuthRoutes from "./routes/AuthRoutes"
import QuestionRoutes from './routes/QuestionRoutes'
import AnswerRoutes from './routes/AnswerRoutes'

const app = express()
const port = process.env.PORT

connectDb()

app.use(cors()) 
app.use(express.json())

app.use('/api/v1/auth',AuthRoutes)
app.use('/api/v1/questions',QuestionRoutes)
app.use('/api/v1/answers',AnswerRoutes)

app.listen(port,(req,res)=>{
    console.log(`SERVER LISTENING AT PORT ${port}`)
})

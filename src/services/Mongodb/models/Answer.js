import mongoose from 'mongoose'

const answerSchema = mongoose.Schema({
    userId:{
       type:String,
       required:true
    },
    question:{
      type:String, // question_id
      required:true
    },
    content:{
        type:String,
        required:true
    }, 
    isAnonymous:{
        type:Boolean,
        default:false
    },
    date:{
        type:String
    }
})

const Answer = mongoose.model('Answer',answerSchema)
export default Answer
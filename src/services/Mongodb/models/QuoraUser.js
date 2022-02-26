import mongoose from 'mongoose'

const quoraUserSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        default:""
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    questionsPosted:{
       type:[String], // array of question id's
       default:[] 
    },
    answersPosted:{
        type:[String], // array of answer id's
        default:[]
    },
    description:{
      type:String,
      default:''
    },
    followers:{
        type:Number,
        default:0
    },
    role:{
        type:Number,
        default:0
    }
})

const QuoraUser = mongoose.model('QuoraUser',quoraUserSchema)
export default QuoraUser

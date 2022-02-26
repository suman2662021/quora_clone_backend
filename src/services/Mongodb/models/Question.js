import mongoose from 'mongoose'

const questionSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    userId:{
     type:String,
     required:true
    },
    answers:{
        type:[mongoose.Types.ObjectId],
        ref:"answer"
    },
    isAnonymous:{
        type:Boolean,
        default:false
    },
    date:{
        type:String
    },
    upvotes:{
        type:Number,
        default:0
    }
})

const Question = mongoose.model('Question',questionSchema)
export default Question
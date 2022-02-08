import mongoose from 'mongoose';
const Schema = mongoose.Schema

const commentsSchema = new Schema({
    message:  {
        type: String,
        required: true
    }, 
    dateCreated: { type: Date, default: Date.now },
})

export default mongoose.model('Comment', commentsSchema);

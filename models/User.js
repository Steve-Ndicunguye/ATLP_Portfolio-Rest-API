import mongoose from 'mongoose';
const Schema = mongoose.Schema

const userSchema = new Schema({
   email: {
       type: String,
       required: true
   },

   role: {
    type: 'string',
    default:"user"
},

   password: {
    type: String, 
    required: true
   },
   firstname: {
    type: String, 
    required: true
   },
   lastname: {
    type: String, 
    required: true
   },
   refreshToken: String
})

export default mongoose.model('User', userSchema);

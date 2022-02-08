
import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({

    title : {
        type: 'string',
        required: true,
        min : 6,
        max : 255
    },

    body : {
        type:'string',
        required: true,
        min:6,
        max:10000
    },

    imgLink : {
        type: 'string',
        required: true,
        min : 6,
        max : 1255
    },

    public_id : {
        //
    },

    
    date : {
        type: 'date',
        default: Date.now
    }

});

export default mongoose.model('BlogPost', blogSchema);

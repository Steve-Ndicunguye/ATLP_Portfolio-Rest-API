
import Joi from '@hapi/joi';

const commentSchema = Joi.object({

    Comment : Joi.string().min(6).trim()
})

export default commentSchema;


import joi from '@hapi/joi';

const articleValidation = (steve) => {
const schema = joi.object({
    title: joi.string().min(6).trim().required(),
    body: joi.string().min(6).trim().required(),
    imgLink: joi.string().min(6).trim().uri().required()
});
 return joi.validate (steve,schema)
}

export default  articleValidation;
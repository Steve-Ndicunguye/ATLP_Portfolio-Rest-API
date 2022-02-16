import User from '../models/User.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import joi from '@hapi/joi';

const schema = joi.object({
        email: joi.string().required().email().message({"string.pattern.base":"Invalid email",
                "string.required":"Email is required", "string.empty":"Email field can not be empty",
                "string.email":"Invalid email"}),
        password: joi.string().min(5).required().message({"string.pattern.base":"Invalid password",
                "string.required":"Password is required", "string.empty":"Password field can not be empty",
                "string.min":"Password length can not be less than 5 characters"})
    });

//test
const handleLogin = async (req, res) => {

    const {error} = schema.validate(req.body);
    if (error) return res.send(error.message: {
      'any.custom': [Object],
      'any.default': [Object],
      'any.failover': [Object],
      'any.invalid': [Object],
      'any.only': [Object],
      'any.ref': [Object],
      'any.required': [Object],
      'any.unknown': [Object],
      'string.alphanum': [Object],
      'string.base': [Object],
      'string.base64': [Object],
      'string.creditCard': [Object],
      'string.dataUri': [Object],
      'string.domain': [Object],
      'string.email': [Object],
      'string.empty': [Object],
      'string.guid': [Object],
      'string.hex': [Object],
      'string.hexAlign': [Object],
      'string.hostname': [Object],
      'string.ip': [Object],
      'string.ipVersion': [Object],
      'string.isoDate': [Object],
      'string.isoDuration': [Object],
      'string.length': [Object],
      'string.lowercase': [Object],
      'string.max': [Object],
      'string.min': [Object],
      'string.normalize': [Object],
      'string.token': [Object],
      'string.pattern.base': [Object],
      'string.pattern.name': [Object],
      'string.pattern.invert.base': [Object],
      'string.pattern.invert.name': [Object],
      'string.trim': [Object],
      'string.uri': [Object],
      'string.uriCustomScheme': [Object],
      'string.uriRelativeOnly': [Object],
      'string.uppercase': [Object]
});
    
    //check if a email is in the database
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email Plz Try Again!');

    //check if the password is correct.
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password Plz Try Again!');


    //create and Assign a token
    const token = jwt.sign({ user : {id: user.id, role: user.role}}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:3600});
    res.header('auth-token', token);

    res.status(200).json({success: 'Logged In Successfully :'});
}



export default { handleLogin };

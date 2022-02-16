import User from '../models/User.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import joi from '@hapi/joi';

const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().min(5).required()
    });

//test
const handleLogin = async (req, res) => {

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send({error: error.details[0].message })
      
    
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

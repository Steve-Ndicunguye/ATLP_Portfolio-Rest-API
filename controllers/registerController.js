import User from '../models/User.js';
import bcrypt from 'bcrypt';
import joi from "@hapi/joi";

const schema = joi.object({
        firstname: joi.string().min(5).required(),
        lastname: joi.string().min(5).required(),
        email: joi.string().required().email(),
        password: joi.string().min(5).required()
    });

const handleNewUser =  async (req, res) => {

    const {error} = schema.validate(req.body);
    if (error) return res.send(error.details[0].message);

    const { email, password, firstname, lastname } = req.body; 
    const duplicate = await User.findOne({ email: email}).exec()
    if (duplicate) return res.status(409).json({'message': 'User already exists'});
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        //create and store the new user
        const result = await User.create({ 
            "email": email,  
            "password": hashedPwd, 
            "firstname": firstname, 
            "lastname": lastname
        });
        console.log(result)

        return res.status(201).json({ 'success': `New user ${email} created!` });
    } catch (err) {
        return res.status(500).json({ 'message': err.message });
    }
}

export default  { handleNewUser };

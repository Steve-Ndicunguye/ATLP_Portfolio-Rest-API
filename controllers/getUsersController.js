import User from '../models/User.js';

const handleGetUsers =  async (req, res) => {

    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).send(error);
    }

}

export default { handleGetUsers };
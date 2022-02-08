import express from 'express';
const router = express.Router();
import registerController  from '../controllers/registerController.js';


/**
 * @swagger
 * /register:
 *  post:
 *    tags:
 *    - "Authentication"
 *    summary: Create an account 
 *    description: Fill inforamation in email, firstname, lastname and password
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: test@domain.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: test123
 *               firstname:
 *                 type: string
 *                 description: The user's firstname.
 *                 example: Graham   
 *               lastname:
 *                 type: string
 *                 description: The user's lastnaname.
 *                 example: Leanne  
 *    responses:
 *      '201':
 *        description: A new user created successfully!
 *      '400':
 *        description: All fields are required required!
 *      '409':
 *        description: Conflict User already exists
 *      '500':
 *        description: Internal server error
*/

router.post('/', registerController.handleNewUser)
    
export default router;
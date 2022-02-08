import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user 
 *         password:
 *           type: string
 *           description: Password of the user
 *       example:
 *         email: name@gmail.com
 *         password: test1231
 */


/**
 * @swagger
 * /login:
 *  post:
 *    tags:
 *    - "Authentication"
 *    summary: Enter your credentials 
 *    description: Used to Authenticate yourself
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '200':
 *        description: login Success
 *      '400':
 *        description: username and password are required
 *      '404':
 *        description: user not found
 */



 router.post('/', authController.handleLogin)

    
export default router;

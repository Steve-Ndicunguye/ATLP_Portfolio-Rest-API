import express from 'express';
const router = express.Router();
import getUsersController from '../controllers/getUsersController.js';
import protectRoute from '../middleware/verifyToken.js';

/**
 * @swagger
 * /getAllUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: All signed up users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized   
*/       
router.route('/')
.get( protectRoute.authAdmin , getUsersController.handleGetUsers) 

    
export default router;

import express from 'express';
const router = express.Router();
import contactController from '../../controllers/contactController.js';
import protectRoute from '../../middleware/verifyToken.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - query
 *       properties:
 *         name:
 *           type: string
 *           description: your name
 *         email:
 *           type: string
 *           description: your email
 *         query:
 *           type: string
 *           description: your query
 *       example:
 *         name: RAF
 *         email: RAF@query.com 
 *         query: Create an easy way of doing registration
 */
router.route('/')
 /**
 * @swagger
 * /contact/createQuerry:
 *   post:
 *     summary: Create a new Query
 *     tags: [Queries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: The query was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Internal server error
*/
router.route('/createQuerry')
.post(contactController.addQ)

/**
 * @swagger
 * /contact/getAllQuerries:
 *   get:
 *     summary: Getting all queries
 *     tags: [Queries]
 *     responses:
 *       200:
 *         description: All available queries
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized   
*/ 

router.route('/getAllQuerries')
.get(protectRoute.authAdmin ,contactController.getAllQs) 

router.route('/:id')
    /**
 * @swagger
 * /contact/deleteQuerry/{id}:
 *   delete:
 *     summary: Remove query by id
 *     tags: [Queries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The query id
 * 
 *     responses:
 *       200:
 *         description: The query was deleted
 *       404:
 *         description: The query was not found
 */
 router.route('/deleteQuerry/:id')
 .delete(protectRoute.authAdmin ,contactController.deleteQs)

export default router;
import express from 'express';
const router = express.Router();
import commentsController from '../../controllers/commentsController.js';
import protectRoute from '../../middleware/verifyToken.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           description: comment message
 *       example:
 *         message: Create an easy way of doing registration 
 */
router.route('/')
/**
 * @swagger
 * /comments/getAllComments:
 *   get:
 *     summary: Getting all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: All available comments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized   
*/  

router.route('/getAllComments')
.get(commentsController.getAllComments)


    /**
 * @swagger
 * /comments/createComment/{id}:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the post you want to comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Internal server error
*/   
    
router.route('/createComment/:id')
.post(commentsController.addComment)
    /**
 * @swagger
 * /comments/deleteComment/{id}:
 *   delete:
 *     summary: Remove the comment by id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of comment to be deleted
 *     responses:
 *       200:
 *         description: successfully deleted!
 *         $ref: '#/components/schemas/Comment'
 *       404:
 *         description: The comment was not found
 */

     router.route('/deleteComment/:id')
     .delete(protectRoute.authAdmin ,commentsController.deleteComments)

export default router;
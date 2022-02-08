import express from 'express';
const router = express.Router();
import  BlogController from '../../controllers/postsController.js';
import protectRoute from '../../middleware/verifyToken.js';



/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - body
 *       properties:
 *         title:
 *           type: string
 *           description: Title of an article 
 *         body:
 *           type: string
 *           description: Article body
 *         imgLink:
 *           type: string
 *           description: The blog Image
 *       example:
 *         title: Total projects in Rda
 *         body: Some words
 *         imgLink: A link to an image
 *   
 */

/**
 * @swagger
 * /posts/getAllPosts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: All available posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized   
*/                                              
router.route('/getAllPosts')
    .get(BlogController.getPosts)

/**
 * @swagger
 * /posts/getSinglePost/{id}:
 *   get:
 *     summary: Get the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article id
 *     responses:
 *       200:
 *         description: The Article description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: The post was not found
 */

router.route('/getSinglePost/:id')
    .get(BlogController.getPostsById)
/**
 * @swagger
 * /posts/deletePost/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 * 
 *     responses:
 *       204:
 *         description: The post was deleted
 *       404:
 *         description: The post was not found
 */

router.route('/deletePost/:id')
 .delete(protectRoute.authAdmin , BlogController.deletePostById)
 /**
 * @swagger
 * /posts/updatePost/{id}:
 *  put:
 *    summary: Update a post
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *    responses:
 *      200:
 *        description: The post was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      404:
 *        description: The post was not found
 *      500:
 *        description: Some error happened
 */

  router.route('/updatePost/:id')
  .put(protectRoute.authAdmin , BlogController.updatePostById)

    /**
 * @swagger
 * /posts/createPost:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal server error
*/

router.route('/createPost')
.post( protectRoute.authAdmin , BlogController.post) 

export default router;

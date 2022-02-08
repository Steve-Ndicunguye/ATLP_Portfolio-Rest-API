import fs from 'fs';
import path from 'path';
import BlogPost from '../models/BlogModel.js';
import  articleValidation  from '../middleware/BlogValidation.js';

class BlogController {

    static post = async (req, res)=>{
        //Let's validate the inputs.
        const {error} = articleValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);   

        const blog = new BlogPost({
            title: req.body.title,
            body: req.body.body,
            imgLink: req.body.imgLink
        });

        try{
            await blog.save();
            res.send(blog);
        } catch(err){
            res.status(400).send(err);
        }

    }

    static updatePostById = async (req, res) => {

        //Let's validate the inputs.
        const {error} = articleValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);   

        const blog = new BlogPost({
            title: req.body.title,
            body: req.body.body,
            imgLink: req.body.imgLink
        });

        try{
            const blog = await BlogPost.findOne({_id: req.params.id});
            if(req.body.title){
                blog.title = req.body.title;
            }
            if(req.body.body){
                blog.body = req.body.body;
            }
            if(req.body.imgLink){
                blog.imgLink = req.body.imgLink;
            }
            await blog.save();
            res.send(blog);
        } catch(err) {
            res.status(400).send({err: "Post Doesn\'t Exist"});
        }
    }

    static getPosts = async (req, res) => {
        
        try{
            const blog = await BlogPost.find();
            res.status(200).json({ message: "liste of all articles", blog });
        } catch(err){
            res.status(404).send(err);
        }

    }

    static getPostsById = async (req, res) => {

        try{
            const blog = await BlogPost.findOne({_id: req.params.id});
            res.status(200).json(blog);
        } catch(err){
            res.status(404).send({err: 'Post Does Not Exist'});
        }
    }

    static deletePostById = async (req, res) => {
        try{
            await BlogPost.deleteOne({_id: req.params.id});
            res.status(204).send();
        } catch(err){
            res.status(400).send({err: 'Post Does Not Exist'});
        }
    }

    static commentPost = async (req, res) => {


        try{
            
            const blog = await BlogPost.findOne({_id: req.params.id});
            
            if(req.body.Comment){
                blog.comment.push({ 
                    comment :req.body.Comment,
                    date : new Date(),
                    username : req.user.username

                });
            }
            await blog.save();
            res.status(200).json(blog);
        } catch(err) {
            res.status(400).send({err: "Post Doesn\'t Exist"});
        }

    }

    static likePost = async (req, res) => {
          
        try{
            const blog = await BlogPost.findOne({_id: req.params.id});

            if(blog.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({
                    msg: 'Post Already Liked'
                });
            }

            blog.likes.unshift({user : req.user.id});

            await blog.save();

            res.json(blog.likes);

            // if(req.body.Comment){
            //     blog.comment.push({ 
            //         comment :req.body.Comment,
            //         date : new Date(),

            //     });
            // }
            // await blog.save();
            // res.send(blog);
        } catch(err) {
            res.status(400).send({err: "Post Doesn\'t Exist"});
        }
    }

}

export default BlogController;

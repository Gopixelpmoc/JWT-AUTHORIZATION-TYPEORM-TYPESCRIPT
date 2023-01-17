import {Request,Response} from "express";
import { getRepository } from "typeorm";
import {Post }from '../entity/Post';

class PostController{

    static postPost= async( req,res)=>  {
        const newPost ={
            title: req.body.title,
            content:  req.body.content,
        };
        
        const post = getRepository(Post).create(newPost);
        const result = await getRepository(Post).save(post);

        if( !newPost.title || !newPost.content) {
            return res.sendStatus(400)
        }
        return res.json(result);
    };
    static getPost = async (req,res)=>{
        const result = await getRepository(Post).find();
        return res.json(result);
    };
    static getOnePost = async (req , res) => {
        const id = req.params.id;
        const post = await getRepository(Post).findOne({ where: { id: req.params.id } });
        if (post) {
            res.send(post);
          } else {
            res.status(400).send({ error: 'Id not found' });

        
        
    };
}

    static updatePost = async (req, res) => {
        const post = await getRepository(Post).findOne({ where: { id: req.params.id } });
        if (post) {
          getRepository(Post).merge(post, req.body);
          const result = await getRepository(Post).save(post);
          return res.json(result);
        }
        return res.json({ msg: "Post Not Found" });
    };
    static deletePost = async (req: Request, res: Response) => {
        const post = await getRepository(Post).delete(req.params.id);
        if (post) {
            res.send(post);
          } else {
            res.status(400).send({ error: 'Id not found' });

        
      };

    }
      

}

export default PostController;
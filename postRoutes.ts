import { Router } from "express";
import PostController from "../controllers/PostController";
import middleware from "../middleware/checkjwt";

const router = Router();

router.post('/addPost', middleware.authorizeUser(),PostController.postPost);
router.get('/getAllPost',middleware.authorizeUser(), PostController.getPost);
router.get('/getPostById/:id', middleware.authorizeUser(), PostController.getOnePost);
router.patch('/updatePost/:id',middleware.authorizeUser(), PostController.updatePost);
router.delete("/deletePost/:id", middleware.authorizeUser(), PostController.deletePost);


export default router;
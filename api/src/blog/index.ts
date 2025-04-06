import express, { NextFunction, Request, Response , } from "express";
import requireLogin from "../middleWere/requireLogin";

import { blogModel } from "../models/blog";

const router = express.Router();



router.get("/api/blogs/:id", requireLogin, async (req, res, ) => {
   
   try {
    
     if (!req.user) {
        res.status(401).send({ error: 'You must log in!' });
        return
     }
  
     const blog = await blogModel.findOne({
        _user: req.user.id,
        _id: req.params.id,
      });
  
      res.send(blog);}
    catch (error) {
        res.send(400, error);
    }
  });
  

  router.get("/api/blogs", requireLogin, async (req, res) => {

    if (!req.user) {
        res.status(401).send({ error: 'You must log in!' });
        return
     }

    const blogs = await blogModel.find({_user:req.user.id}).cache()

    res.send(blogs)
  });

  router.post("/api/blogs", requireLogin, async (req, res) => {
    const { title, content } = req.body;
    if (!req.user) {
        res.status(401).send({ error: 'You must log in!' });
        return
     }

    const blog = new blogModel({
      title,
      content,
      _user: req.user.id,
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
;



export { router };

export default router;
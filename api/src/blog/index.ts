import express, { NextFunction, Request, Response } from "express";
import requireLogin from "../middleWere/requireLogin";

import { blogModel } from "../models/blog";
import { cacheQuery } from "../services/cache";
import cleanCacheMiddleware from "../middleWere/clearCache";


const router = express.Router();

router.get("/:id", requireLogin, async (req, res, next) => {
  try {
    console.log("USER OBJECT:", req.user);

    const blog = await blogModel.findOne({
      _user: (req as any).user?.id,
      _id: (req as any).params.id,
    });

    res.send(blog);
  } catch (error) {
    next(error);
  }
});


router.get("/", requireLogin, async (req, res) => {
   
    console.log((req as any).user.id);
  const blogs = await cacheQuery(blogModel.find({ _user: (req as any).user.id, }));

  

  res.send(blogs);
});

router.post("/", requireLogin,cleanCacheMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;

  
  const blog = new blogModel({
    title,
    content,
    _user:(req as any).user?.id,
  });

  try {
    await blog.save();
    res.send(blog);
   
  } catch (error) {
    next(error); 
  }

});


export { router };

export default router;

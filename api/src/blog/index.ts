import express, { NextFunction, Request, Response } from "express";
import requireLogin from "../middleWere/requireLogin";

import { blogModel } from "../models/blog";

const router = express.Router();

router.get("/api/blogs/:id", requireLogin, async (req, res, next) => {
  try {
   

    const blog = await blogModel.findOne({
      _user: (req as any).user.id,
      _id: req.params.id,
    });

    res.send(blog);
  } catch (error) {
    next(error);
  }
});

router.get("/api/blogs", requireLogin, async (req, res) => {

  const blogs = await blogModel.find({ _user: (req as any).user.id, }).cache();

  res.send(blogs);
});

router.post("/api/blogs", requireLogin, async (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;

  
  const blog = new blogModel({
    title,
    content,
    _user:(req as any).user.id,
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

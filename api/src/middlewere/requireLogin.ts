
import { NextFunction, Request, Response } from "express";

export default function requireLogin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
     res.status(401).send({ error: 'You must log in!' });
     
  }

  next();
}


  
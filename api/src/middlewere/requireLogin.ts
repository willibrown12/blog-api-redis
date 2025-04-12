import { NextFunction, Request, Response } from "express";

export default function requireLogin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    next(new Error)
  }
  console.log("im here middle");
  
  next();
}
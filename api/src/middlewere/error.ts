import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(error.message, res.getHeader("x-request-id"));
  res.status(500).send("Something went wrong!");
}

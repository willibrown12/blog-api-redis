
import { Request, Response, NextFunction } from "express";
import { clearHash } from "../services/cache";


export default async function cleanCacheMiddleware(req: Request, res: Response, next: NextFunction){
  await next();

console.log("im here cache");

  clearHash((req as any).user?.id)

}
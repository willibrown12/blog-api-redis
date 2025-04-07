import { Request } from 'express';

declare global {
  namespace Express {
    interface User {
      id?: string; // Replace 'string' with the actual type of your user ID
     
    }

    interface Request {
      user?: User; // Make 'user' optional in case the middleware doesn't run
    }
  }
}
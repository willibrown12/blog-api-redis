import { Request } from 'express';

declare global {
  namespace Express {
    interface User {
      id: string; // Replace 'string' with the actual type of your user ID
      // Add other properties of your user object here
      [key: string]: any; // Allows for other potential user properties
    }

    interface Request {
      user?: User; // Make 'user' optional in case the middleware doesn't run
    }
  }
}
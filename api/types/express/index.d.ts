// src/types/express.d.ts
import { UserType } from '../models/user';

declare global {
  namespace Express {
    interface User extends UserType {
      id?: string; // Ensure 'id' is part of the User interface (can be virtual or _id from MongoDB)
    }

    interface Request {
      user?: User; // Make 'user' optional in case the middleware doesn't run
    }
  }
}
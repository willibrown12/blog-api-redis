import mongoose from 'mongoose';

export type UserType = {
    googleId: string;       
    displayName: string;
  };

  const userSchema = new mongoose.Schema<UserType>({
    googleId: { type: String },
    displayName: { type: String }
  });


const userModel = mongoose.model("users", userSchema, "users"); 
export { userModel };

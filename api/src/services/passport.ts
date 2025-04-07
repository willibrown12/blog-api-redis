import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';
import { userModel } from '../models/user';
import dotenv from "dotenv";
dotenv.config()


const User = mongoose.model('User');

passport.serializeUser((user : any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id).then(user => {
      done(null, user || false);
  });
});

passport.use(
    new GoogleStrategy(
      {
        callbackURL: '/auth/google/callback',
        clientID: process.env.googleClientId as string,
        clientSecret: process.env.googleSecret as string,
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ googleId: profile.id });
          
          // If user already exists, return the existing user
          if (existingUser) {
            return done(null, existingUser);
          }
  
          // If no user exists, create a new user
          const user = await new User({
            googleId: profile.id,
            displayName: profile.displayName
          }).save();
  
          // Pass the user object to done (can be null if user creation fails)
          done(null, user);
        } catch (err) {
          // Pass error to done (with null for user)
          done(err, undefined); 
        }
      }
    )
  );
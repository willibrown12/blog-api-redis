
import express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose" ;
import session  from "express-session";
import passport from "passport";
import bodyParser from"body-parser";
import { router as blogRouter } from "./blog/index";

dotenv.config()



const app = express()

app.use(bodyParser.json());

app.use(
    session({
      secret: process.env.cookieKey as string, // Keep your secret key
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: false, // Change to `true` if using HTTPS
      },
    })
  );

  app.use(passport.initialize());
app.use(passport.session());

app.use("/Products", blogRouter);

app.get("/",(req,res,next)=>{
    res.send("api is okay")
})

app.listen(process.env.PORT, ()=> {
    console.log(`api is running on port ${process.env.PORT}`);
    
})




import express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose" ;
import session  from "express-session";
import passport from "passport";
import bodyParser from"body-parser";
import { router as blogRouter } from "./blog/index";
import { router as authRouter } from "./auth/index";
import errorHandler from "./middleWere/error";
import { redisConnect } from "./services/cache";
import mongoConnect from "./db/connectDB";

import "./services/passport";
import cors from "cors";

dotenv.config()



const app = express()
app.use(cors());

app.use(bodyParser.json());
mongoConnect()
redisConnect();

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

app.get("/api/current_user", (req, res) => {
  console.log("ssss");
  
  res.send(req.user);
});


app.use("/api/blogs", blogRouter);
app.use("/auth", authRouter);

app.get("/",(req,res,next)=>{
    res.send("api is okay")
    console.log("USER OBJECT:", req.user);
})


app.use(errorHandler);
app.listen(process.env.PORT, ()=> {
    console.log(`api is running on port ${process.env.PORT}`);
    
})



import express, { NextFunction, Request, Response } from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/blogs");
  }
);

router.get("/auth/logout", (req: Request, res: Response, next) => {
  req.logout((error) => {
    if (error) {
      console.error("Error during logout:", error);

      return next(error);
    }
    res.redirect("/");
  });
});

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

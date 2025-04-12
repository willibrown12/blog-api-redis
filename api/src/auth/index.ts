import express, { NextFunction, Request, Response } from "express";
import passport from "passport";

const router = express.Router();

router.get("/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login", // Add this for better error handling on the backend
    session: true, // Ensure session is saved
  }),
  (req, res) => {
    // Successful authentication, req.user should now be populated
    console.log("Successfully authenticated by Google!");
    // Redirect to your frontend application
    res.redirect("http://localhost:3000/blogs"); // Assuming "/blogs" is a route on your frontend
  }
);

router.get("/logout", (req: Request, res: Response, next) => {
  req.logout((error) => {
    if (error) {
      console.error("Error during logout:", error);
      return next(error);
    }
    res.redirect("/"); // Or redirect to your frontend logout page
  });
});

export { router };

export default router;

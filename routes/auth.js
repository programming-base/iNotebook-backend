import express from "express";
import passport from "passport";
import User from "../models/users.js";
import bcrypt, { hash } from "bcrypt";
const router = express.Router();

router.get("/login",passport.authenticate("google", { scope: ["email", "profile"] }))
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.FRONTEND_URL||"http://localhost:5173"}`,
    failureRedirect: `${process.env.FRONTEND_URL||"http://localhost:5173"}/login`
  })
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Could not log out, please try again." });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});


export default router;
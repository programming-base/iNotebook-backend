import express from "express";
import passport from "passport";
import User from "../models/users.js";
import bcrypt, { hash } from "bcrypt";
const router = express.Router();

router.get("/login",passport.authenticate("google", { scope: ["email", "profile"] }))
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL||"http://localhost:5173",
    failureRedirect: (process.env.FRONTEND_URL+'/login')||"http://localhost:5173/login",
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

//manual login/signup handling
router.post('/login/manual', async (req, res) => {
  const { email, password } = req.body;

  try {
    const isuser = await User.findOne({ email: email });
    if (!isuser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Await the result of bcrypt.compare
    const ismatch = await bcrypt.compare(password, isuser.password);
    if (!ismatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Log in user manually
    req.login(isuser, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Logged in successfully", user: isuser });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/signup",async (req,res)=>{
  const {name,email,password}=req.body;
  console.log(name,email,password)
  try{
    const userexists=await User.findOne({email:email});
    if(userexists){
      return res.status(400).json({error:"User already exists"})
    }
    const hashedpassword=await bcrypt.hash(password,10);
    const user={
      name,
      email,
      password: hashedpassword
    }
    const adduser=await User(user).save();
    req.login(adduser,(err)=>{
      if(err){
        return res.status(500).json({error:err.message})
      }
      res.status(201).json({message:"User created successfully"})
    })
  }catch(err){
    res.status(500).json({error:err.message})
  }
})
export default router;
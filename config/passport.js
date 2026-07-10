import User from "../models/users.js";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${backendUrl}/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        }

        const newUser = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        });
        await newUser.save();
        return done(null,newUser);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user._id);
  console.log(user);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user =await User.findById(id);
      done(null, user);
  } catch (err) {
    done(err);
  }
});

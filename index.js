import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import "./database.js";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";
import MongoStore from "connect-mongo";
import notes from "./routes/notes.js";
import { isAuthenticated } from "./middlewares/isAuthenticated.js";
const app = express();

app.set("trust proxy", 1);

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const isProduction = process.env.NODE_ENV === "production";

app.use(cors({
  origin: frontendUrl,
  credentials: true
}));

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  proxy:true,
  cookie:{
    sameSite:isProduction ? "none" : "lax",
    secure:isProduction,
  },
  store: MongoStore.create(
    {
      mongoUrl:process.env.MONGO_URI||"mongodb://localhost:27017/inotebook",
      collectionName:"sessions",
    }
  )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", auth);
app.use("/notes",notes);
app.get("/",isAuthenticated,(req,res)=>{
  res.json({user:req.user,isAuthenticated:true})
})
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

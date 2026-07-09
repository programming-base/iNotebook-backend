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

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(session({
  secret:"iwanabenexttoyou",
  resave:false,
  saveUninitialized:false,
  store: MongoStore.create(
    {
      mongoUrl:"mongodb://localhost:27017/inotebook",
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
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

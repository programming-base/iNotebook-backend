import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI||"mongodb://localhost:27017/inotebook").then(
    ()=>{
        console.log("Connected to MongoDB");
    }
).catch((err)=>{
    console.error("Failed to connect to MongoDB", err);
});
export default mongoose;

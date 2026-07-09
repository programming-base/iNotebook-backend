import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  googleId:{
    type:String
  }
  ,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required:function(){
      return !this.googleId
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;

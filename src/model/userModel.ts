import mongoose from "mongoose";

export const UserModel = mongoose.model("User",new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    userName:{type:String},
}))
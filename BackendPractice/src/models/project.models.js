import mongoose, { Schema, model } from "mongoose";

const projectSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true});

const Project = model("Project", projectSchema);

export { Project };
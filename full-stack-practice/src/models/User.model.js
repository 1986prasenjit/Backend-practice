import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true,
        unique:true,
        trim:true,
    },
    isUserVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    refreshToken:{
        type:String
    },
    passwordResetToken:{
        type:String,
    },
    passwordResetExpiry:{
        type:Date,
    }

})

const User = mongoose.model("User", userSchema);

export default User;
import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
    },
    lastname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone_number:{
        type:String,
        require:true,
        unique:true,
        default: "+923054170452"
    },
    pan_card_number:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        
    },
    role:{
        type: String,
    enum: ['user', 'admin'], // Allowed roles
    default: 'user', // Default role
    }
},{timestamps:true});
const User=mongoose.model('User',userSchema)
export default User;
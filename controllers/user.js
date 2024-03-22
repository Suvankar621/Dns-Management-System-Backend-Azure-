import bcrypt from "bcrypt";
import {User} from "../models/user.js"

import { sendCookie } from "../utils/features.js";


export const Register=async(req,res)=>{
    const {name,email,password}=req.body;

    let user= await User.findOne({email});

    if(user){
        return res.status(404).json({
            success:false,
            message:"User Already Exist"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);

    user=await User.create({name,email,password:hashedPassword});
    sendCookie(user,res,"Registerd Successfully",201);


}


export const Login=async(req,res)=>{
    const {email,password}=req.body;

    let user=await User.findOne({email}).select("+password");

    if(!user){
        return res.status(404).json({
            success:false,
            message:"Invalid Credentials"
        })
    }
    const isMatched=bcrypt.compare(password,user.password);

    if(!isMatched){
        return res.status(404).json({
            success:false,
            message:"Invalid Credentials"
        })
    }
    sendCookie(user,res,`Welcome Back, ${user.name}`,200);
 
}

export const Logout=async(req,res)=>{
   res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({
    success:true,
    message:"Logout Successfully"
   })
 
}
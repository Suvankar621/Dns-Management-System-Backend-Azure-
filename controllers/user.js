import bcrypt from "bcrypt";
import {User} from "../models/user.js"
import jwt from "jsonwebtoken"

import { GenerateAuthToken, sendCookie } from "../utils/features.js";


export const Register=async(req,res)=>{
    try {
        const {name,email,password,subscriptionid,clientid,client_secret,tenantId}=req.body;

        let user= await User.findOne({email});
    
        if(user){
            return res.status(404).json({
                success:false,
                message:"User Already Exist"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
    
        user=await User.create({name,email,subscriptionid,clientid,client_secret,tenantId,password:hashedPassword,});
        sendCookie(user,res,"Registerd Successfully",201);
    } catch (error) {
        res.status(500).send("Invalid Credentials");
    }
   


}


export const Login=async(req,res)=>{
    try {
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
    } catch (error) {
        res.status(500).send("Invalid Credentials");
    }
    
 
}


export const GetMyDetails=async(req,res)=>{
    
  try {
    
    const {token}=req.cookies;
    if(!token){
      return res.status(404).json({
        success:false,
        message:"Login First"
    })
    }

  const decoadeddata=await jwt.verify(token,process.env.JWT_SECRET);
  const user=await User.findById(decoadeddata._id);
  //////////////////
  const { tenantId, clientid, client_secret } =await user;

 const atoken = await GenerateAuthToken(
  tenantId,
  clientid,
  client_secret,
  "https://management.azure.com/"
);
const authtoken = `Bearer ${atoken}`;


  //////////////////
    res.status(200).json({
      success: true,
      user,authtoken
    });
  } catch (error) {
    res.status(500).send("Invalid Credentials");
  }
   


}



export const Logout=async(req,res)=>{
   res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({
    success:true,
    message:"Logout Successfully"
   })
 
}
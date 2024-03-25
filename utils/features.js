import jwt from "jsonwebtoken";


export const sendCookie=(user,res,message,statuscode=200)=>{
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);

    res.status(statuscode).cookie("token",token,{
        httpOnly:true,
        sameSite:"none",
        secure:true
    }).json({
        success:true,
        message
    })
}


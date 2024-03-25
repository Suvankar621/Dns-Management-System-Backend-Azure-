import express from "express";
import userRouter from "./routes/Users.js";
import cookieParser from "cookie-parser";
import cors from "cors"




export const app=express();

const corsOptions = {
    origin: process.env.frontendurl,
    credentials: true,
  };
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


app.use("/api/v1/",userRouter);




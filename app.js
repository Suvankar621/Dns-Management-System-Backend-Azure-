import express from "express";
import userRouter from "./routes/Users.js";
import DnsRouter from "./routes/DnsRouter.js";
import cookieParser from "cookie-parser";



export const app=express();

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/",userRouter);
app.use("/api/v1/",DnsRouter);



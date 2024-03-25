import express from "express";
import userRouter from "./routes/Users.js";
import DnsRouter from "./routes/DnsRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors"




export const app=express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use("/api/v1/",userRouter);
app.use("/api/v1/",DnsRouter);



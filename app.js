import express from "express";
import userRouter from "./routes/Users.js";
import cookieParser from "cookie-parser";
import cors from "cors"




export const app=express();

app.use(cors({
  origin: "https://suvankar-mahato-dnsmanager.netlify.app",
  credentials: true
}));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


app.use("/api/v1/",userRouter);




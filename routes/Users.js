import express from "express";
import { Login, Logout, Register } from "../controllers/user.js";

const router=express.Router();

router.post("/users/register",Register);
router.post("/users/login",Login);
router.get("/users/logout",Logout);

export default router;
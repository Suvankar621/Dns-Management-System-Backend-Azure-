import express from "express";
import { AddDns, DeleteDns, GetAllDns, UpdateDns } from "../controllers/dnscontroller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router=express.Router();

router.get("/dns/:domain",isAuthenticated,GetAllDns).post(AddDns);
router.put("/dns/:domain/:recordName",isAuthenticated, UpdateDns).delete(DeleteDns);

export default router;
import express from "express";
import { AddDns, DeleteDns, GetAllDns, UpdateDns } from "../controllers/dnscontroller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router=express.Router();

router.get("/dns",GetAllDns);
router.put("/dns/add", AddDns);
router.put("/dns/edit" , UpdateDns);
router.delete("/dns/delete", DeleteDns);

export default router;
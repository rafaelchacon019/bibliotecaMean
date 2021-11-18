import express from "express";
import admin from "../controllers/adminController.js";
const router = express.Router();

router.post("/registerAdmin", admin.registerAdmin);
router.post("/login", admin.login);


export default router;
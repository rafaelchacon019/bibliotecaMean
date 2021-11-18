import express from "express";
import proveedor from "../controllers/proveedorController.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
const router = express.Router();

router.post("/registerProveedor", auth, proveedor.registerProveedor);
router.get("/listProveedor", auth, proveedor.listProveedor);
router.put("/updateProveedor", auth, proveedor.updateProveedor);
router.delete("/deleteProveedor/:_id", auth, proveedor.deleteProveedor);

export default router;
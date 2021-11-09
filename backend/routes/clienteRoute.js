import express from "express";
import cliente from "../controllers/clienteController.js";
const router = express.Router();

router.post("/registerCliente", cliente.registerCliente);
router.get("/listCliente", cliente.listCliente);

export default router;
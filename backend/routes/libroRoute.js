import express from "express";
import libro from "../controllers/libroController.js";
const router = express.Router();

router.post("/registerLibro", libro.registerLibro);
router.get("/listLibro", libro.listLibro);

export default router;
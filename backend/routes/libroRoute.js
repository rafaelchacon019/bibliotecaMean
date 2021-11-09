import express from "express";
import libro from "../controllers/libroController.js";
const router = express.Router();

router.post("/registerLibro", libro.registerLibro);
router.get("/listLibro", libro.listLibro);
router.put("/updateLibro", libro.updateLibro);
router.delete("/deleteLibro/:_id", libro.deleteLibro);

export default router;
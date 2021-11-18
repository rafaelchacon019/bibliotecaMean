import express from "express";
import libro from "../controllers/libroController.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
const router = express.Router();

router.post("/registerLibro", auth, admin, libro.registerLibro);
router.get("/listLibro", auth, libro.listLibro);
router.get("/listLibroById/:_id", auth, admin, libro.findLibro);
router.put("/updateLibro", auth, admin, libro.updateLibro);
router.delete("/deleteLibro/:_id", auth, admin, libro.deleteLibro);

export default router;
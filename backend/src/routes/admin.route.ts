import { Router } from "express";
import createAdmin from "../controllers/admin/createAdmin";
import deserializeUser from "../middleware/deserializeUser";
import adminAuth from "../middleware/adminAuth";
const router = Router();
router.post("/signup", deserializeUser, adminAuth, createAdmin);

export default router;

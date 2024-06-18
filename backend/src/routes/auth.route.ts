// routes/auth.route.ts
import express, { Router, Request, Response } from "express";
import signup from "../controllers/auth/signup";
import login from "../controllers/auth/login";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;

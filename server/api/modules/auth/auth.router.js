import express from "express";
import { verifyNin } from "./auth.controller.js";

// import { auth } from "../controllers/auth.js";
const router = express.Router();

router.post("/verify-nin", verifyNin);

export const AuthRouter = router;
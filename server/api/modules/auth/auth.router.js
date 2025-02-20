import express from "express";
import { addRequest, testFetch, verifyNin } from "./auth.controller.js";

// import { auth } from "../controllers/auth.js";
const router = express.Router();

router.post("/verify-nin", verifyNin);
router.post("/addReq", addRequest);
router.get("/testReq", testFetch);

export const AuthRouter = router;
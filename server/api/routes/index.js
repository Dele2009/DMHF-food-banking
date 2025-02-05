import express from "express";
import { AuthRouter } from "../modules/auth/auth.router.js";

const router = express.Router();
const routes = [
     {
          path: "/auth",
          route: AuthRouter,
     },
]

routes.forEach((route) => router.use(route.path, route.route));

export default router;
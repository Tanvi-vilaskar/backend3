import { Router } from "express";
import { regsiterUser } from "../controllers/user.controller.js";

const router=Router();

router.post("/register",regsiterUser)
// router.route("/login").post(loginUser)
export default router;



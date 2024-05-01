import express from "express";
import { signup, signin, signinTest } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
// router.post("/signinTest", signinTest);


export default router;

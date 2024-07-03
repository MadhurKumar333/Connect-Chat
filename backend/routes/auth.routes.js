import express from "express";
import { signup,login, logout, } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/signup",signup);
//the call back function inside each of line may contain a lot of code so which we will become messay so creating a controller for each of this

router.post("/login",login);

router.post("/logout",logout);

export default router;

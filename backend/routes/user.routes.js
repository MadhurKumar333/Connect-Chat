import express from "express";
import { getUsersForSidebar } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

//route for users for the sidebar
router.get("/",protectRoute, getUsersForSidebar);//protectroute function is provided so that non-authenticated users cannot call getusers function
    

export default router;
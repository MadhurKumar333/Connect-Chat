import { getMessages,  sendMessage } from "../controllers/message.controller.js";
import express from "express";
import protectRoute from "../middleware/protectRoute.js";

//creating router
const router = express.Router();

router.get("/:id", protectRoute, getMessages);//to get the messages between current user and userid

router.post("/send/:id", protectRoute, sendMessage);//we are adding a kind of authorisation using protectRoute before calling a sendMessage(basically checks user is logged in or not before calling send message)

// router.post("/receive/:id", receiveMessage);

//exporting router
export default router;
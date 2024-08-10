import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";//we need to put.js at the end as we are using import statement
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";



dotenv.config();
// console.log(process.env);

const PORT = process.env.PORT || 4000;

//body parser middleware
app.use(express.json());//to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

//creating middleware for authentication routes(like signup,login and logout)
app.use("/api/auth", authRoutes);
//here we can use different routes for login,signup and logout but it will become messy so created middleware

//creating message routes using middlewware
app.use("/api/messages", messageRoutes);

//create user routes using middleware
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
    //root route
    res.send("Hello world");
});


server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Listening on port ${PORT}`);
})
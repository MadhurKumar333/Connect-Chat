import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async(req, res, next) => {
    try {
        //get the token using cookies
        const token = req.cookies.jwt;//for this to work we need to import cookie parser in server.js and we need to call it as a middleware
        //if token not present return error
        if (!token) {
            return res.status(401).json({
                error: "Unauthorized-NO Token Provided"
            });
        }
        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        //if decode valur not presemt throw error
        if (!decoded) {
            return res.status(401).json({
                error: "Unauthorized-Invalid Token"
            });
        }

        const user = await User.findById(decoded.userId).select("-password");
        //if not user return user not found
        if (!user) {
            return res.status(401).json({
                error: "Unauthorized-User Not Found"
            });
        }
        
        //add the user to the request
        req.user = user;
        next();

    } catch (error) {
        //console logging error
        console.log("Error in the protectRoute middleware:",error.message);
        //sending error
        res.status(500).json({ error: "Internal Server error" });
    }
}
export default protectRoute;
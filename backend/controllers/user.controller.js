import User from "../models/user.model.js";

export const getUsersForSidebar = async(req, res) => {
    try {
        //getting logged in user id
        const loggedInUserId = req.user._id;
        //fetch all users from the database
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");//this line says find all the users in database except user with loggedinuserid
        
        res.status(200).json(filteredUsers);

    } catch (error) {
      //console logging a error message
      console.error("Error in getUsersForSidebar controller", error.message);
      //sending a error message
      res.status(500).json({ error: "Internal Server error" });
    }
};
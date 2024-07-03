import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Passwords don't match",
      });
    }
    const user = await User.findOne({ username });
    //if the user already exists give an error username already exists
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
      //Hash Password here we will be using a bcrypt library for that
      const salt = await bcrypt.genSalt(10);//the higher the value the more it is secured but the higher the value the more slower it is
      const hashedPassword = await bcrypt.hash(password, salt);

      //API LINK for random avatar generator https://avatar-placeholder.iran.liara.run/
      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      //creating a new user name using above fields
      const newUser = new User({
          fullname,
          username,
          password:hashedPassword,
          gender,
          profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      });
      
      if (newUser) {
          //generating a JWT token
          generateTokenAndSetCookie(newUser._id,res);

          await newUser.save(); //Saving user in a database

          //Sending user details as a response
          res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            gender: newUser.gender,
            profilePic: newUser.profilePic,
          });
      }
      else {
          res.status(400).json({ error: "Failed to create a user" });
      }
  } catch (error) {
      //console logging a error message
      console.log("Error in signup controller",error.message);
      //sending a error message
      res.status(500).json({ error:"Internal Server error" });
  }
};

export const login = async(req, res) => {
    try {
        //getting the username and password from the request body
        const { username, password } = req.body;
        //checking if the username and password are present
        if (!username || !password) {
            return res.status(400).json({ error: "Please enter all the fields" });
        }
        //finding the user in the database
        const user = await User.findOne({ username });
        //checking if the user is present
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        //checking if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);//decoding password and comparing
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        //generating a JWT token
        generateTokenAndSetCookie(user._id, res);
        //sending user details as a response
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            gender: user.gender,
            profilePic: user.profilePic,
        });
        
  } catch (error) {
    //console logging a error message
    console.log("Error in login controller", error.message);
    //sending a error message
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const logout =(req, res) => {
    try {
        //removing the cookie
        res.cookie("jwt", "", { maxAge: 0 });
        //sending a success message
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        //console logging a error message
        console.log("Error in logout controller", error.message);
        //sending a error message
        res.status(500).json({ error: "Internal Server error" });
    }
};

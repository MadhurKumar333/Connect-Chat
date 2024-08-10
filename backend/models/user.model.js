//WE need to import a mongoose and then create a schema for creating a model
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    //creatinhg fields
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: ""
    }
  //we can use created and updated at to show member created at this time
},{timestamps:true});
//creating a model based on above schema
const User = mongoose.model("User", userSchema);
export default User;

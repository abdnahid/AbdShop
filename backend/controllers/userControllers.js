import asyncHandler from "express-async-handler";
import User from "../mdoels/userModel.js";
import generateToken from "../utils/generateToken.js";



// @desc register user and login
// @route POST api/users
// @access public
export const registerUser = asyncHandler(async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const userExists = await User.findOne({email});
        if (userExists) {
            res.status(400);
            throw new Error("User Already Exists")
        }
        const user = await User.create({name,email,password})
        if (user) {
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user._id)
            })
        }else{
            res.status(404);
            throw new Error("Invalid User Data")
        }
    } catch (error) {
        res.status(500).json(error.message);
        console.error(error.message);
    }
    
})


// @desc get user and verify
// @route POST api/users/login
// @access public
export const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await User.findOne({email})
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user._id)
            })
        }else{
            res.status(401);
            res.json({msg:"Invalid email or Password"})
        }
        
    } catch (error) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})
// @desc get user profile
// @route POST api/users/profile
// @access private
export const getUserProfile = asyncHandler(async(req,res)=>{
    const {_id,name,email,isAdmin}=req.authorizedUser;
    res.json({
        _id,
        name,
        email,
        isAdmin
    })
})
// @desc update user profile
// @route PUT api/users/profile
// @access private
export const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.authorizedUser._id);
    console.log(req.body);
    user.name = req.body.name||user.name;
    user.email = req.body.email||user.email;
    if (req.body.password) {
        user.password=req.body.password;
    }
    const updatedUser = await user.save();
    if (updatedUser) {
        res.status(201).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
        })
    }else{
        res.status(404);
        throw new Error("Something went wrong.Couldnt save to database")
    }
})
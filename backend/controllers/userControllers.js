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
// @route GET api/users/profile?id
// @access private
export const getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.query.id);
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    })
})
// @desc update user profile
// @route PUT api/users/profile
// @access private
export const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.authorizedUser._id);
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
            token:generateToken(updatedUser._id)
        })
    }else{
        res.status(404);
        throw new Error("Something went wrong.Couldnt save to database")
    }
})

// @desc get all users
// @route GET api/users
// @access private admin
export const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({})
    res.json(users);
})

// @desc delete user
// @route DELETE api/users/:id
// @access private admin
export const deleteUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if (user) {
        user.remove();
        res.send("User deleted Successfully");
    }else{
        res.status(404);
        throw new Error('User Not found');
    }
})

// @desc get user by ID
// @route GET api/users/:id
// @access private/admin
export const getUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    }else{
        res.status('404');
        throw new Error('User Not Found');
    }
})
// @desc update users by admin
// @route PUT api/users/:id
// @access private/admin
export const updateUserByAdmin = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    user.name = req.body.name||user.name;
    user.email = req.body.email||user.email;
    user.isAdmin = req.body.isAdmin
    const adminUpdatedUser = await user.save();
    if (adminUpdatedUser) {
        res.status(201).json({
            _id:adminUpdatedUser._id,
            name:adminUpdatedUser.name,
            email:adminUpdatedUser.email,
            isAdmin:adminUpdatedUser.isAdmin,
        })
    }else{
        res.status(404);
        throw new Error("Something went wrong. Couldn't update the user.");
    }
})

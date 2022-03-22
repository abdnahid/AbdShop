import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../mdoels/userModel.js";

const authorization = asyncHandler(async(req,res,next)=>{

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            let token = req.headers.authorization.split(" ")[1];
            const decoded =jwt.verify(token,process.env.JWT_SECRET);
            req.authorizedUser = await User.findById(decoded.id).select("-password");
            next();
        } catch (err) {
            res.status(401).json({msg:"User is not authorized"});
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, No token or token is invalid')
    }
})
export const adminAuth = asyncHandler(async(req,res,next)=>{

    if (req.authorizedUser && req.authorizedUser.isAdmin) {
        next();
    }else{
        res.status(401);
        throw new Error('Not authorized, Only Admin can access this.')
    }
})

export default authorization

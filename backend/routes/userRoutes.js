import express from "express";
import { loginUser, getUserProfile, registerUser, updateUserProfile } from "../controllers/userControllers.js";
import authorization from "../middleware/authMiddleware.js";

const router=express.Router();

router.post('/',registerUser);
router.post('/login',loginUser);
router.route('/profile').get(authorization,getUserProfile).put(authorization,updateUserProfile);

export default router;

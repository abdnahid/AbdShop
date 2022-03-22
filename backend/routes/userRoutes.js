import express from "express";
import { loginUser, getUserProfile, registerUser, updateUserProfile, getAllUsers } from "../controllers/userControllers.js";
import authorization,{adminAuth} from "../middleware/authMiddleware.js";

const router=express.Router();

router.post('/',registerUser).get('/',authorization,adminAuth,getAllUsers);
router.post('/login',loginUser);
router.route('/profile').get(authorization,getUserProfile).put(authorization,updateUserProfile);

export default router;

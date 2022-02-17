import express from "express";
import { addPromo, getPromo } from "../controllers/promoControllers.js";
import authorization from "../middleware/authMiddleware.js";

const router=express.Router();

router.route('/').post(authorization,addPromo).get(getPromo);

export default router;

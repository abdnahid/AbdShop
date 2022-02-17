import express from "express";
import { addOrder,getOrderById } from "../controllers/orderControllers.js";
import authorization from "../middleware/authMiddleware.js";

const router=express.Router();

router.route('/').post(authorization,addOrder)
router.route('/:id').get(authorization,getOrderById)

export default router;

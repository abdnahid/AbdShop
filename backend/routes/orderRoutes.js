import express from "express";
import { addOrder,getMyOrders,getOrderById, payOrder } from "../controllers/orderControllers.js";
import authorization from "../middleware/authMiddleware.js";

const router=express.Router();

router.route('/').post(authorization,addOrder);
router.route('/myorders').get(authorization,getMyOrders);
router.route('/:id').get(authorization,getOrderById);
router.route('/:id/pay').put(authorization,payOrder);

export default router;

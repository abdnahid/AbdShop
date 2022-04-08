import express from "express";
import { addOrder,getAllOrders,getMyOrders,getOrderById, payOrder,deliverOrder } from "../controllers/orderControllers.js";
import authorization, { adminAuth } from "../middleware/authMiddleware.js";

const router=express.Router();

router.route('/').post(authorization,addOrder).get(authorization,adminAuth,getAllOrders);
router.route('/myorders').get(authorization,getMyOrders);
router.route('/:id').get(authorization,getOrderById);
router.route('/:id/pay').put(authorization,payOrder);
router.route('/:id/deliver').put(authorization,adminAuth,deliverOrder);

export default router;

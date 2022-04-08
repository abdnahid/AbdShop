import express from "express";
import { createProduct, createProductReview, deleteProduct, getAllProducts,getSingleProduct, updateProduct } from "../controllers/productControllers.js";
import authorization,{adminAuth} from "../middleware/authMiddleware.js";

const router=express.Router();

router.route('/').get(getAllProducts).post(authorization,adminAuth,createProduct);
router.route('/:id/reviews').post(authorization,createProductReview);


router.route('/:id').get(getSingleProduct).delete(authorization,adminAuth,deleteProduct).put(authorization,adminAuth,updateProduct);

export default router;
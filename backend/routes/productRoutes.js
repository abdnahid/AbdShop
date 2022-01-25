import express from "express";
import mongoose from "mongoose";
import Product from "../mdoels/productModel.js";
import asyncHandler from "express-async-handler";

const router=express.Router();

// @desc fetch all products
// @route GET api/products
// @access public
router.get('/',asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.json(products);
}))

// @desc fetch single product
// @route GET api/products/:id
// @access public
router.get('/:id',asyncHandler(async(req,res)=>{
    const singleProduct = await Product.findById(req.params.id);
    if (singleProduct) {
        res.json(singleProduct);   
    }else{
        res.status(404).json({message:"product not found"});
    }
}))

export default router;
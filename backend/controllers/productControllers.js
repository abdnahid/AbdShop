import asyncHandler from "express-async-handler";
import Product from "../mdoels/productModel.js";
import mongoose from "mongoose";



// @desc fetch all products
// @route GET api/products
// @access public
export const getAllProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.json(products);
})

// @desc fetch single product
// @route GET api/products/:id
// @access public
export const getSingleProduct = asyncHandler(async(req,res)=>{
    const singleProduct = await Product.findById(req.params.id);
    if (singleProduct) {
        res.json(singleProduct);   
    }else{
        res.status(404).json({message:"product not found"});
    }
})
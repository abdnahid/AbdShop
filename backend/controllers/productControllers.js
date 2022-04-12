import asyncHandler from "express-async-handler";
import Product from "../mdoels/productModel.js";
import mongoose from "mongoose";



// @desc fetch all products
// @route GET api/products
// @access public
export const getAllProducts = asyncHandler(async(req,res)=>{
    const keyword = req.query.keyword ? {
        name:{
            $regex:req.query.keyword,
            $options: 'i'
        }
    } : {}
    const page = Number(req.query.pageNumber) || 1
    const pageSize = 10;
    const count = await Product.countDocuments({...keyword})
    const pages = Math.ceil(count/pageSize)
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page -1));
    res.json({products,page,pages});
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

// @desc delete products
// @route DELETE api/products/:id
// @access private admin
export const deleteProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if (product) {
        product.remove();
        res.send("Product deleted Successfully");
    }else{
        res.status(404);
        throw new Error('Product Not found');
    }
})
// @desc create new product
// @route POST api/products
// @access private/admin
export const createProduct = asyncHandler(async(req,res)=>{
    try {
        const product = new Product({
            user:req.authorizedUser._id,
            name:'sample product name',
            image:'/images/sample.jpg',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            brand:'sample brand',
            category:'sample category',
            price:0,
            countInStock:0
        })
        const createdProduct = await product.save();
        res.status(201).json(createdProduct)
    } catch (error) {
        res.status(500).json(error.message);
        console.error(error.message);
    }
    
})

// @desc update product by admin
// @route PUT api/products/:id
// @access private/admin
export const updateProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if (product) {
        const {name,image,description,brand,category,rating,price,countInStock}=req.body;
        product._id = req.params.id;
        product.name=name;
        product.image=image;
        product.description=description;
        product.brand=brand;
        product.category=category;
        product.rating=rating;
        product.price=price;
        product.countInStock=countInStock;
        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct)
    }else{
        res.status(404);
        throw new Error("Product not found");
    }
})


// @desc create new product review
// @route POST api/products/:id/reviews
// @access private
export const createProductReview = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if (product) {
        const {rating,comment}=req.body;
        const {_id,name}=req.authorizedUser;
        const alreadyReviewed = product.reviews.find(r=>r.user.toString() === _id.toString());
        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product already reviewed by this user")
        }
        const newReview = {
            name,
            rating,
            comment,
            user:_id
        }
        product.reviews.push(newReview);
        product.numReviews = product.reviews.length;
        const avgRating = (product.reviews.reduce((acc,item)=>item.rating+acc,0))/product.reviews.length;
        product.rating = avgRating;
        await product.save();
        res.status(201).json({msg:"Review Added"})
    }else{
        res.status(404);
        throw new Error("Product not found");
    }
})

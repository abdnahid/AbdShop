import asyncHandler from "express-async-handler";
import Order from "../mdoels/orderModel.js";



// @desc create new order
// @route POST api/orders
// @access private
export const addOrder = asyncHandler(async(req,res)=>{
    try {
        const {
            orderItems,
            shippingAddress,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentMethod
        }=req.body;
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("Cannot create an empty order")
        }
        const createOrder = await new Order({
            user:req.authorizedUser._id,
            orderItems,
            shippingAddress,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentMethod
        })
        const newOrder = await createOrder.save()
        if (newOrder) {
            res.status(201).json(newOrder)
        }else{
            res.status(404);
            throw new Error("Invalid order to process. Please try again")
        }
    } catch (error) {
        res.status(500).json(error.message);
        console.error(error.message);
    }
    
})
// @desc get order by ID
// @route GET api/orders/:id
// @access private
export const getOrderById = asyncHandler(async(req,res)=>{
    const orderId = req.params.id;
    try {
        
        const orderFound = await Order.findById(orderId)
        if (orderFound) {
            res.status(201).json(orderFound)
        }else{
            res.status(404);
            throw new Error("Order is not found")
        }
    } catch (error) {
        res.status(500).json(error.message);
        console.error(error.message);
    }
    
})
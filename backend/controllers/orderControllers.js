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
            paymentMethod,
            placedAt
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
            paymentMethod,
            placedAt
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
// @desc get all orders of a user
// @route GET api/orders/myorders
// @access private
export const getMyOrders = asyncHandler(async(req,res)=>{
    const orders = await Order.find({user:req.authorizedUser._id})
    res.status(201).json(orders);
})
// @desc update order payment status
// @route PUT api/orders/:id/pay
// @access private
export const payOrder = asyncHandler(async(req,res)=>{
    const orderId = req.params.id;
    const {id,status,update_time,payer}=req.body;
    try {
        const order = await Order.findById(orderId)
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id,
                status,
                update_time,
                email_address:payer.email_address
            }
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        }else{
            res.status(404);
            throw new Error("Order is not found")
        }
    } catch (error) {
        res.status(500).json(error.message);
        console.error(error.message);
    }
    
})
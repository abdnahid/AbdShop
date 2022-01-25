import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./mdoels/userModel.js";
import Product from "./mdoels/productModel.js";
import Order from "./mdoels/orderModel.js";
import users from "./data/users.js";
import products from "./data/products.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async()=>{
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const importedUsers=await User.insertMany(users);
        console.log(importedUsers);
        const adminUser = importedUsers[0]._id;
        const sampleProducts=products.map((product)=>{
            return {...product,user:adminUser}
        })
        await Product.insertMany(sampleProducts);
        console.log("Data imported successfully");
        process.exit()
    } catch (error) {
        console.log(`data imported results in error: ${error.message}`);
        process.exit(1);
    }
}
const destroyData = async()=>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        console.log("all database data deleted");
        process.exit()
    } catch (error) {
        console.log(`data deletion results in error: ${error.message}`);
        process.exit(1);
    }
}

if (process.argv[2]==='-d') {
    destroyData();
}else{
    importData();
}
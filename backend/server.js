import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import promoRoutes from "./routes/promoRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"
import {notFound,errorHandler} from "./middleware/middleware.js";

dotenv.config();
connectDB();


const app = express();

app.use(express.json({extended:false}))
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/promos',promoRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/uploads',uploadRoutes);
app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_ID))
app.get('/',async(req,res)=>{
    res.send('API running...')
})
const  __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT||5000;

app.listen(PORT,console.log(`server started in ${process.env.NODE_ENV} mode on port ${PORT}`))
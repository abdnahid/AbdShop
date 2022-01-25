import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import {notFound,errorHandler} from "./middleware/middleware.js";

dotenv.config();
connectDB();


const app = express();

app.use('/api/products',productRoutes)
app.get('/',async(req,res)=>{
    res.send('API running...')
})

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT||5000;

app.listen(PORT,console.log(`server started in ${process.env.NODE_ENV} mode on port ${PORT}`))
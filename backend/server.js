const express = require('express');
const app= express();
const PORT=5000;

const products=require('./data/products');
app.get('/',(req,res)=>{
    res.send('API running...')
})

app.get('/api/products',(req,res)=>{
    res.json(products);
})

app.get('/api/products/:id',(req,res)=>{
    const singleProduct = products.find((p)=>p._id===req.params.id)
    res.json(singleProduct);
})

app.listen(PORT,console.log("server started"))
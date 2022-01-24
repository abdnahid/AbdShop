import React,{useState,useEffect} from 'react';
import axios from 'axios';
import ProductCard from '../Products/ProductCard';

const Home = () => {
  const [products,setProducts]=useState([]);
  useEffect(()=>{
    const findProducts = async()=>{
      const res= await axios.get("/api/products");
      setProducts(res.data);
    }
    findProducts();
  },[])
  return (
      <div className="row">
          {products.map((product)=><ProductCard product={product} key={product._id}/>)}
      </div>
  )
};

export default Home;

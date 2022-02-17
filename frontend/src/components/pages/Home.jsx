import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import ProductCard from '../Products/ProductCard';
import { fetchProducts } from '../../actions/productListActions';
import Loading from '../layout/Loading';
import Message from '../layout/Message';

const Home = () => {
  const dispatch = useDispatch();
  const productsListState = useSelector((state)=>state.productList)
  const {products,loading,error}=productsListState
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  return (
    <div className="section-padding">
      <div className="container">
        <div className="row justify-content-center">
            {loading?<Loading />:error?<Message type="danger" message={error}/>:(products.map((product)=><ProductCard product={product} key={product._id}/>))}
        </div>
      </div>
    </div>
  )
};

export default Home;

import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import ProductCard from '../Products/ProductCard';
import { fetchProducts } from '../../actions/productListActions';
import Loading from '../layout/Loading';
import Message from '../layout/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../layout/Paginate';
import ProductCaro from '../layout/ProductCaro';
import Meta from '../layout/Meta';

const Home = () => {
  const {keyword,pageNumber}=useParams();
  const dispatch = useDispatch();
  const productsListState = useSelector((state)=>state.productList)
  const {products,loading,error,pages,page}=productsListState;
  const userState = useSelector((state)=>state.userLogin);
  const {isAdmin}= userState.userInfo || false;
  useEffect(()=>{
    dispatch(fetchProducts(keyword,pageNumber))
  },[dispatch,keyword,pageNumber])
  return (
    <div>
      <Meta/>
      <ProductCaro products={products}/>
      <div className="container">
        <div className="row justify-content-center">
            {loading?<Loading />:error?<Message type="danger" message={error}/>:(products.map((product)=><ProductCard product={product} key={product._id}/>))}
        </div>
        <Paginate keyword={keyword} page={page} pages={pages} isAdmin={isAdmin} />
      </div>
    </div>
  )
};

export default Home;
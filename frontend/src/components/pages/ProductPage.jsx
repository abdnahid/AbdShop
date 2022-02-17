import React,{useState,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import {useDispatch,useSelector} from 'react-redux';
import { fetchProduct } from '../../actions/productListActions';
import Loading from '../layout/Loading';
import Message from '../layout/Message';

const ProductPage = () => {
    const { id } = useParams();
    const [qty,setQty]=useState(1);
    const productState = useSelector((state)=>state.productList);
    const dispatch = useDispatch();
    const {currentProduct,loading,error}=productState;
    const {_id,name,image,description,brand,category,price,countInStock,rating,numReviews}=currentProduct;
    const navigate = useNavigate();
    useEffect(()=>{
      dispatch(fetchProduct(id))
    },[])
    const handleAddToCart=()=>{
      navigate(`/cart/${id}?qty=${qty}`)
    }
  return (
    <div className='section-padding'>
      <div className="container">
        <div className="row align-items-center">
            {loading?
              <Loading /> : error ?
              <Message type="danger" message={error}/> : (
              <>
                <div className="col-md-6">
                  <img src={image} alt={name} />
                </div>
                <div className="col-md-6">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><h3>{name}</h3></li>
                    <li className="list-group-item">
                      <StarRatings rating={rating} numberOfStars={5} name='rating' starDimension='20px' starRatedColor='rgb(251, 183, 44)'/><span className='review-rating'>({numReviews} Reviews)</span>
                    </li>
                    <li className="list-group-item">
                      <div className="product-price"> <span className='text-dark'>Price:</span> $ {price}</div>
                    </li>
                    <li className="list-group-item">
                      <h5>Product Details:</h5>
                      <p>{description}</p>
                    </li>
                  </ul>
                  <table className='table-dark table table-striped'>
                    <tbody>
                      <tr className='table-dark'>
                        <td><strong>Status:</strong></td>
                        <td>{countInStock>0?`${countInStock} In stock`:'Out of stock'}</td>
                      </tr>
                      <tr className='table-dark'>
                        <td><strong>Seller Brand</strong></td>
                        <td>{brand}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row">
                    {countInStock>0 && (
                      <div className="col-md-6">
                        <select className="form-select" aria-label="Default select example" value={qty} onChange={(e)=>setQty(e.target.value)}>
                          {[...Array(countInStock).keys()].map((x)=><option key={x+1} value={x+1}>{x+1}</option>)}
                        </select>
                      </div>
                    )}
                    <div className="col-md-6 d-grid"><button className='btn btn-dark btn-block' disabled={countInStock>0?0:1} onClick={handleAddToCart}>Add to cart</button></div>
                  </div>
                </div>
              </>
              )}
        </div>
      </div>
    </div>
  )
};

export default ProductPage;

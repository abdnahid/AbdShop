import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import {useDispatch,useSelector} from 'react-redux';
import { fetchProduct } from '../../actions/productListActions';
import Loading from '../layout/Loading';
import Message from '../layout/Message';

const ProductPage = () => {
    const { id } = useParams();
    const productState = useSelector((state)=>state.productList);
    const dispatch = useDispatch();
    const {currentProduct,loading,error}=productState;
    useEffect(()=>{
      dispatch(fetchProduct(id))
    },[])
    const {_id,name,image,description,brand,category,price,countInStock,rating,numReviews}=currentProduct;
  return (
    <>
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
                <button className='btn btn-dark btn-block' disabled={countInStock>0?0:1}>Add to cart</button>
              </div>
            </>
            )}
      </div>
    </>
  )
};

export default ProductPage;

/*  */

import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const ProductPage = () => {
    const { id } = useParams();
    const [product,setProduct]=useState({});
    useEffect(()=>{
      const findProduct=async()=>{
        const res = await axios.get(`/api/products/${id}`)
        setProduct(res.data)
      }
      findProduct();
    },[])
    const {_id,name,image,description,brand,category,price,countInStock,rating,numReviews}=product;
  return (
    <>
      <div className="row align-items-center">
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
        </div>
    </>
  )
};

export default ProductPage;

import React from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

const ProductCard = (props) => {
    const {name,image,description,brand,category,price,countInStock,rating,numReviews,_id}=props.product;
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="product-card">
            <div className="badge">
                {brand}
            </div>
            <div className="product-tumb">
                <Link to={`/product/${_id}`}>
                    <img src={image} alt={name} />
                </Link>
            </div>
            <div className="product-details">
                <span className="product-catagory">{category}</span>
                <h4><Link to={`/product/${_id}`}>{name}</Link></h4>
                <div><StarRatings rating={rating} numberOfStars={5} name='rating' starDimension='20px' starRatedColor='rgb(251, 183, 44)'/></div>
                <div className='pt-2'>{numReviews} Reviews</div>
                <p className='pt-4 line-clamp-3'>{description}</p>
                <div className="product-bottom-details">
                    <div className="product-price">$ {price}</div>
                    <div className="product-links">
                        <a href='#!'><i className="fa fa-heart" /></a>
                        <a href='#!'><i className="fa fa-shopping-cart" /></a>
                    </div>
                </div>
                <div>{countInStock>0?`${countInStock} in stock`:'out of stock'}</div>
            </div>
        </div>
    </div>
  
  );
};

export default ProductCard;

import React from 'react';
import { Link } from 'react-router-dom';

const ProductCaro = ({products}) => {
    const sortedProducts = products.slice().sort((a,b)=>b.rating-a.rating).slice(0,3);
  return (
    <>
        <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
            {sortedProducts.map((item,index)=><button key={index} type="button" data-bs-target="#productCarousel" data-bs-slide-to={index} className={index===0&&"active"}/>)}
        </div>
        <div className="carousel-inner">
            {sortedProducts.map((item,index)=>(
                <div className={`carousel-item ${index===0&&"active"}`} key={index}>
                    <Link to={`/product/${item._id}`}>
                        <img src={item.image} className="d-block" alt={item.name} />
                        <div className="carousel-caption d-none d-md-block">
                        <h2>{item.name}</h2>
                        <p>$ {item.price}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" />
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" />
            <span className="visually-hidden">Next</span>
        </button>
        </div>
    </>
  )
}

export default ProductCaro
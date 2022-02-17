import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className='empty-cart'>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-4">
                    <h2>No Items to show</h2>
                    <div>Add something to cart and come back</div>
                    <div>
                    <Link to="/">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )};

export default EmptyCart;

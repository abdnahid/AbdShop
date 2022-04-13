import React from 'react';
import { Link } from 'react-router-dom';

const OrderSteps = ({step1,step2,step3}) => {
  return (
    <div className="flexbox text-center order-steps">
            <div className="column-33">
                <Link className={`nav-link ${step1?"active slanted":""}`} to="/cart">Cart</Link>
            </div>
            <div className="column-33">
                <Link className={`nav-link ${step2?"active slanted":""}`} to="/shipping">Checkout</Link>
            </div>
            <div className="column-33">
                <span className={`nav-link ${step3?"active slanted":""}`}>Payment</span>
            </div>
    </div>
  )
}

export default OrderSteps
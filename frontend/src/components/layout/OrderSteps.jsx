import React from 'react';
import { Link } from 'react-router-dom';

const OrderSteps = ({step1,step2,step3}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className={`nav-link text-dark ${step1?"active":""}`} to="/cart">Cart</Link>
            </li>
            <li className="nav-item">
                <i className="fa-solid fa-arrow-right" />
            </li>
            <li className="nav-item">
                <Link className={`nav-link text-dark ${step2?"active":""}`} to="/shipping">Checkout</Link>
            </li>
            <li className="nav-item">
            <i className="fa-solid fa-arrow-right" />
            </li>
            <li className="nav-item">
                <Link className={`nav-link text-dark ${step3?"active":""}`} to="/payment">Payment</Link>
            </li>
        </ul>
    </nav>
  )
}

export default OrderSteps
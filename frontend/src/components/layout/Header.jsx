import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">AbdShop</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="main-menu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/cart">
                  <i className="fas fa-shopping-cart" /><span className='px-2'>cart</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                <i className="fas fa-sign-in-alt"/><span className='px-2'>Sign in</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
};

export default Header;

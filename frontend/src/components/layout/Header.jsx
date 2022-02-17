import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import { openModal } from '../../actions/modalActions';

const Header = () => {
  const loginState = useSelector((state)=>state.userLogin.userInfo);
  const dispatch = useDispatch();
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
                <Link className="nav-link" to="/cart">
                  <i className="fas fa-shopping-cart" /><span className='px-2'>cart</span>
                </Link>
              </li>
                {loginState ? (
                  <>
                    <li className='nav-item'>
                      <Link className="nav-link" to="/profile">
                        <i className="fas fa-user"/><span className='px-2'>{loginState.name}</span>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <button className="nav-link" onClick={()=>dispatch(logout())}>
                        <i className="fas fa-sign-out-alt"/><span className='px-2'>Logout</span>
                      </button>
                    </li>
                  </>):(
                  <button className="nav-link" onClick={()=>dispatch(openModal())}>
                    <i className="fas fa-sign-in-alt"/><span className='px-2'>Sign in</span>
                  </button>)}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
};

export default Header;

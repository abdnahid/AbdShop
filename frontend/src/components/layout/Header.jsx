import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import { openModal } from '../../actions/modalActions';
import Logo from './logo.jpeg';
import SearchBox from './SearchBox';

const Header = () => {
  const loginState = useSelector((state)=>state.userLogin.userInfo);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark custom-bg-theme">
        <div className="container">
          <Link className="navbar-brand" to="/"><img src={Logo} alt="logo" className='img-fluid' /></Link>
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
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to='#' id="accountDropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">Account</Link>
                    <ul className="dropdown-menu" aria-labelledby="accountDropdownMenu">
                      <li className='d-grid'>
                        <button className="nav-link" onClick={()=>navigate("/profile")}>
                          <i className="fas fa-user"/><span className='px-2'>{loginState.name}</span>
                        </button>  
                      </li>
                      <li className='d-grid'>
                        <button className="nav-link" onClick={()=>dispatch(logout())}>
                          <i className="fas fa-sign-out-alt"/><span className='px-2'>Logout</span>
                        </button>
                      </li>
                    </ul>
                  </li>
                  {loginState.isAdmin && (
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" to='#' id="adminDropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">Admin</Link>
                      <ul className="dropdown-menu" aria-labelledby="adminDropdownMenu">
                        <li className='d-grid'>
                          <button className="nav-link" onClick={()=>navigate("/admin/userList")}>
                            <i className="fa-solid fa-users" /><span className='px-2'>Users list</span>
                          </button>  
                        </li>
                        <li className='d-grid'>
                          <button className="nav-link" onClick={()=>navigate("/admin/productList")}>
                          <i className="fa-solid fa-layer-group" /><span className='px-2'>Product List</span>
                          </button>
                        </li>
                        <li className='d-grid'>
                          <button className="nav-link" onClick={()=>navigate("/admin/orderList")}>
                          <i className="fa-solid fa-file" /><span className='px-2'>Order List</span>
                          </button>
                        </li>
                      </ul>
                    </li>
                  )}
                </>):(
                  <li className='nav-item'>
                    <button className="nav-link" onClick={()=>dispatch(openModal())}>
                      <i className="fas fa-sign-in-alt"/><span className='px-2'>Sign in</span>
                    </button>
                  </li>)}
            </ul>
            <SearchBox />
          </div>
        </div>
      </nav>
    </header>
  )
};

export default Header;

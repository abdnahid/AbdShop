import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart,removeFromCart } from '../../actions/cartListActions';
import { useParams,useLocation,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import { openModal } from '../../actions/modalActions';
import OrderSteps from '../layout/OrderSteps';

const CartPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {search}=useLocation();
    const qty = search ? Number(search.split('=')[1]) : 1;
    const navigate = useNavigate();

    useEffect(()=>{
        if (id) {
            dispatch(addToCart(id,qty))
        }
    },[dispatch,id,qty])
    const cartItemsState = useSelector((state)=>state.cartList.cartItems);
    const loginState = useSelector((state)=>state.userLogin.userInfo);
    
    return (
        <>
            {cartItemsState.length>0 ? (
                <div className="section-padding cart-page">
                    <div className="container cart_wrapper">
                        <OrderSteps step1/>
                        <div className="cart_lists">
                            <div className="cart_list_wrap">
                                <div className="cart_responsive">
                                    {cartItemsState.length===0?(<h3>No items to show</h3>):cartItemsState.map((item,index)=>(
                                        <div className="tr_item row" key={index}>
                                            <div className="td_item item_img col-1">
                                                <img src={item.image} alt={item.name} className='img-fluid'/>
                                            </div>
                                            <div className="td_item item_name col-6">
                                                <Link to={`/product/${item.productId}`}>
                                                    <h3 className="main">{item.name}</h3>
                                                </Link>
                                            </div>
                                            <div className="wrap td_item col-2">
                                                <div className="numbers">
                                                    <button 
                                                        className="minus" 
                                                        disabled={cartItemsState[index].qty>1?0:1} 
                                                        onClick={()=>dispatch(addToCart(item.productId,Number(cartItemsState[index].qty)-1))}>
                                                        <i className="fas fa-minus-square" />
                                                    </button>
                                                    <div className="box">
                                                        <span className="number">{cartItemsState[index].qty}</span>
                                                    </div>
                                                    <button 
                                                        className="plus" 
                                                        disabled={cartItemsState[index].qty===item.countInStock?1:0} 
                                                        onClick={()=>dispatch(addToCart(item.productId,Number(cartItemsState[index].qty)+1))}>
                                                        <i className="fas fa-plus-square" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="td_item item_price col-2">
                                                <label>$ {(item.price*item.qty).toFixed(2)}</label>
                                            </div>
                                            <div className="td_item item_remove col-1">
                                                <button onClick={()=>dispatch(removeFromCart(item.productId))}>
                                                    <i className="fas fa-trash-alt" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="cart-footer row">
                                    <div className="col-3">
                                        <Link to="/" className='btn btn-back custom-outline-button'>
                                            <p>
                                                <i className="fas fa-hand-point-left" />Back to Shop
                                            </p>
                                        </Link>
                                    </div>
                                    <div className="cart_details d-grid col-4">
                                        <button className="btn custom-theme-button" onClick={()=>loginState?navigate('/shipping'):dispatch(openModal())}>Checkout</button>
                                    </div>
                                    <div className="col-2 cart-total-title">
                                        <label>Total: </label>
                                    </div>
                                    <div className="col-2 cart-total">
                                        $ {cartItemsState.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
                                    </div>
                                    <div className="col-1">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> ) : (<EmptyCart />)}
        </>
    )
};

export default CartPage;

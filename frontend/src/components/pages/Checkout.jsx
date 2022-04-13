import React,{useEffect, useState,useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { saveShipping } from '../../actions/cartListActions';
import OrderSteps from '../layout/OrderSteps';
import { getPromo } from '../../actions/promoActions';
import { addOrder } from '../../actions/orderActions';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginState = useSelector((state)=>state.userLogin.userInfo);
    const shippingState = useSelector((state)=>state.cartList.shippingAddress);
    const cartItemsState = useSelector((state)=>state.cartList.cartItems);
    const promoState= useSelector((state)=>state.promo)
    const [name,setName]=useState(shippingState.name);
    const [email,setEmail]=useState(shippingState.email);
    const [phone,setPhone]=useState(shippingState.phone);
    const [address,setAddress]=useState(shippingState.address);
    const [zip,setZip]=useState("");
    const [country,setCountry]=useState(shippingState.country);
    const [paymentMethod,setPaymentMethod]=useState("paypal");
    const [promo,setPromo]=useState("");
    const countryOptions = useMemo(() => countryList().getData(), []);
    const orderCreateState = useSelector(state=>state.orderCreate)
    const {order,success,error}=orderCreateState
    useEffect(()=>{
        if (!loginState) {
            navigate("/");
        }
        //eslint-disable-next-line
    },[loginState])
    useEffect(()=>{
        if (success) {
            navigate(`/order/${order._id}`)
        }
        //eslint-disable-next-line
    },[success])
    cartItemsState.cartTotalPrice = cartItemsState.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2);
    cartItemsState.shippingPrice = cartItemsState.cartTotalPrice>50 ? 10 : 0;
    cartItemsState.taxPrice = (cartItemsState.cartTotalPrice*0.05).toFixed(2);
    const {type,value}=promoState
    const promoValue = type && type==="percentage"?(cartItemsState.cartTotalPrice*(value/100)).toFixed(2):type&&type==="flat"?value:0;
    const finalTotal = (Number(cartItemsState.cartTotalPrice)+Number(cartItemsState.shippingPrice)+Number(cartItemsState.taxPrice)-Number(promoValue)).toFixed(2);
    const today = new Date();
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(saveShipping({name,email,phone,address,zip,country}))
        dispatch(addOrder({
            orderItems:cartItemsState,
            shippingAddress:shippingState,
            taxPrice:cartItemsState.taxPrice,
            shippingPrice:cartItemsState.shippingPrice,
            totalPrice:finalTotal,
            paymentMethod,
            placedAt:today
        }))
    }
    const handlePromo=(e)=>{
        e.preventDefault();
        dispatch(getPromo(promo));
    }
  return (
      <div className="section-padding">
        <div className="container checkout-wrapper">
            <OrderSteps step1 step2/>
            <div className="row checkout-info">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Order Summary</span>
                    </h4>
                    <ul className="list-group mb-3">
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Cart Total Price</span>
                            <strong>$ {cartItemsState.cartTotalPrice}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Tax Price</span>
                            <strong>$ {cartItemsState.taxPrice}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Shipping Price</span>
                            <strong>$ {cartItemsState.shippingPrice}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between bg-light">
                            <div className="text-success">
                                <h6 className="my-0">Promo Discount</h6>
                            </div>
                            <span className="text-success">-$ {promoValue}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total</span>
                            <strong>$ {finalTotal}</strong>
                        </li>
                    </ul>
                    <form className="card p-2" onSubmit={handlePromo}>
                        <div className="input-group">
                            <input type="text" className="form-control" value={promo} placeholder="Promo code" onChange={(e)=>setPromo(e.target.value)} />
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-secondary">Redeem</button>
                            </div>
                        </div>
                    </form>
                    <hr className="mb-4" />
                    <h4 className="mb-3">Payment</h4>
                    <div className="d-block my-3">
                        <div className="custom-control custom-radio">
                            <input 
                                id="paypal" 
                                type="radio" 
                                className="custom-control-input" 
                                value="paypal" checked={paymentMethod==="paypal"?true:false} 
                                onChange={(e)=>setPaymentMethod(e.target.value)}
                            />
                            <label className="custom-control-label" htmlFor="paypal">PayPal</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input 
                                id="cod" 
                                type="radio" 
                                className="custom-control-input" 
                                value="cod" checked={paymentMethod==="cod"?true:false} 
                                onChange={(e)=>setPaymentMethod(e.target.value)}
                            />
                            <label className="custom-control-label" htmlFor="cod">Cash on Delivery</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input 
                                id="stripe" 
                                type="radio" 
                                className="custom-control-input" 
                                value="stripe" checked={paymentMethod==="stripe"?true:false} 
                                onChange={(e)=>setPaymentMethod(e.target.value)}
                            />
                            <label className="custom-control-label" htmlFor="stripe">Stripe</label>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Billing address</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="fullName">Name</label>
                            <input type="text" className="form-control" id="fullName" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" className="form-control" id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" value={address} onChange={(e)=>setAddress(e.target.value)} required />
                        </div>
                        <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="country">Country</label>
                            <Select className="custom-select d-block w-100" id="country" required value={country} options={countryOptions} onChange={(value)=>setCountry(value.label)}/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="zip">Zip</label>
                            <input type="text" className="form-control" id="zip" required value={zip} onChange={(e)=>setZip(e.target.value)}/>
                        </div>
                        </div>
                        <hr className="mb-4" />
                        <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" className="custom-control-input" id="agreement" value="I agree to shipping and return policy" />
                            <label className="custom-control-label mx-2" htmlFor="agreement">I agree to shipping and return policy</label>
                        </div>
                        <div className="d-grid">
                            <button className="btn custom-theme-button btn-block" type="submit">Place order</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
  )
}

export default Checkout
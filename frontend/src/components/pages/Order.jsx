import { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { PayPalButton } from "react-paypal-button-v2";
import Loading from '../layout/Loading';
import Message from '../layout/Message';
import { getOrderList, payOrderAction } from '../../actions/orderActions';
import { ORDER_PAY_RESET } from '../../actions/types';
import moment from "moment";


const Order = () => {
  const [sdkReady,setSdkReady]=useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderDetailsState = useSelector((state)=>state.orderDetails);
  const {loading,orderList,error}=orderDetailsState;
  const orderPayState = useSelector(state=>state.orderPay);
  const {loading:loadingPay,success:successPay}=orderPayState;
  const formattedDate = moment(orderList.placedAt).format('MMM Do YYYY, h:mm a');
  useEffect(()=>{
    const addPaypalScript=async()=>{
      const {data:clientId}=await axios.get('/api/config/paypal')
      const script = document.createElement('script');
      script.type='text/javascript';
      script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async=true;
      script.onload=()=>{
        setSdkReady(true);
      }
      document.body.appendChild(script);
    }
    dispatch({type:ORDER_PAY_RESET})
    dispatch(getOrderList(id));
    if (!orderList.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      }else{
        setSdkReady(true)
      }
    }
    //eslint-disable-next-line
  },[dispatch,id,successPay])
  const onSuccessHandler = (paymentResult)=>{
    console.log(paymentResult);
    dispatch(payOrderAction(id,paymentResult))
  }
  return (
      <div className="container">
        <section className="my-orders">
              {loading?
                <Loading /> : error ?
                <Message type="danger" message={error}/> : (
                  <>
                    <h2>My Orders</h2>
                    <p className="py-3">View and Edit all your pending, delivered and returned orders here</p>
                    <p className="py-2"><span className='fw-bold'>Name:</span> {orderList.shippingAddress.name}</p>
                    <p className="py-2"><span className='fw-bold'>Email:</span> <a href={`mailto:${orderList.shippingAddress.email}`}>{orderList.shippingAddress.email}</a></p>
                    <div className="order-body">
                      <div className="row heading justify-content-center align-items-center">
                        <div className="col-md-4">
                          <span className='btn-effect'><span className='strong'>order #</span> <span style={{color:"#107cd9"}}>{orderList._id}</span></span>
                        </div>
                        <div className="col-md-5">
                        <span className='strong'>order placed on: </span>{formattedDate}
                        </div>
                        <div className="col-md-3 text-end">
                          <button className='custom-theme-button'>Track Order</button>
                        </div>
                      </div>
                          {orderList.orderItems.map((order,index)=>(
                            <div className="row order-list align-items-center py-4 order-item-border" key={index}>
                              <div className="col-md-2 image-icon">
                                <img src={order.image} alt={order.name} className="img-fluid" />
                              </div>
                              <div className="col-md-4">
                                <h4 className='text-dark'>{order.name}</h4>
                                <div className="qty-price text-black-50">
                                  <span>quantity: {order.qty}</span><span>Price: {order.price}</span>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <p>Status</p>
                              </div>
                              <div className="col-md-3">
                                {orderList.isDelivered ?
                                  <h4 className='text-success'>Delivered</h4> :
                                  <>
                                    <p>Expected delivery date</p>
                                    <h4>2 jun, 2022</h4>
                                  </>
                                }
                              </div>
                            </div>
                          ))}
                      <div className="row align-items-center footing order-item-border">
                            <div className="col-md-2 col-sm-6 cancel-order">
                                <button className='btn btn-primary'><i className="fa-solid fa-xmark" /> Cancel Order</button>
                            </div>
                            <div className="col-sm-5 text-center paypal-button">
                              {orderList.isPaid ?
                                <h4 className='text-success'>Paid</h4> :
                                <>
                                  {(loadingPay || !sdkReady) ? 
                                    <Loading/> :
                                    <PayPalButton amount={orderList.totalPrice} onSuccess={onSuccessHandler} style={{layout:'horizontal',color:'blue',tagline:false}}/>
                                  }

                                </>
                              }
                            </div>
                            <div className="col-sm-5 text-end order-total">
                              $ {orderList.totalPrice}
                            </div>
                      </div>
                    </div>
                  </>
                )}
        </section>
      </div>
  )
};

export default Order;

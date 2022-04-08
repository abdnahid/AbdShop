import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import moment from 'moment';
import Loading from '../layout/Loading';
import Message from '../layout/Message';
import { deliverOrderAction, getAdminOrders } from '../../actions/orderActions';


const OrderListAdmin = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const loginState = useSelector((state)=>state.userLogin);
  const {userInfo}=loginState
  useEffect(()=>{
      if (!userInfo || !userInfo.isAdmin) {
          navigate("/");
      }else{
          dispatch(getAdminOrders());
      }
      //eslint-disable-next-line
  },[userInfo,dispatch]);
  const adminOrdersState = useSelector((state)=>state.adminOrders);
  const {adminOrders,loading,error}=adminOrdersState;
  const handlePay = (delivered,id)=>{
    dispatch(deliverOrderAction(delivered,id));
  }
  return (
      <div className="container">
        <section className="my-orders">
            {loading?
            <Loading /> : error ?
            <Message type="danger" message={error}/> : (
                <div className='col-12 py-5'>
                    <h2 className='text-start'>All Orders</h2>
                    <table className="table my-5 table-light table-striped">
                        <thead>
                            <tr className='text-center'>
                                <th scope="col">ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Total</th>
                                <th scope="col">Paid</th>
                                <th scope="col">Delivered</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        {adminOrders.map((order,index)=>(
                            <tr key={index} className='text-center'>
                                <th scope="row">#{order._id.slice(19,24)}</th>
                                <td>{moment(order.placedAt).format('Do MMMM , YYYY')}</td>
                                <td>$ {order.totalPrice}</td>
                                <td>{order.isPaid?<i className="fas fa-check text-success" />:<i className="fa-solid fa-xmark text-danger" />}</td>
                                <td>
                                    <select className="form-select" defaultValue={order.isDelivered ? 1 : 0} onChange={(e)=>handlePay(e.target.value,order._id)}>
                                        <option value={0}>Processing</option>
                                        <option value={1}>Delivered</option>
                                    </select>
                                </td>
                                <td>
                                    <div className='d-grid'>
                                        <button className='btn btn-primary' type='button' onClick={()=>navigate(`/order/${order._id}`)}>Details</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
      </div>
  )
};

export default OrderListAdmin;

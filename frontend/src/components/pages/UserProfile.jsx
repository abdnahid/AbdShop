import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { userUpdate,userDetails } from '../../actions/userActions';
import { getMyOrders } from '../../actions/orderActions';
import Loading from '../layout/Loading';
import Message from '../layout/Message';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputName,setInputName]= useState("");
    const [inputEmail,setInputEmail]= useState("");
    const [inputPassword,setInputPassword]= useState("");
    const [conPassword,setConPassword]= useState("");
    const [passwordView,setPasswordView]= useState(false);
    const detailsState = useSelector((state)=>state.userDetails);
    const myOrdersState = useSelector((state)=>state.myOrders);
    const {loading,myOrders,error}=myOrdersState
    const {user}=detailsState
    const loginState = useSelector((state)=>state.userLogin);
    const {userInfo}=loginState
    useEffect(()=>{
        if (!userInfo) {
            navigate("/");
        }else{
            dispatch(getMyOrders());
            if (!user.name) {
                dispatch(userDetails());
            }else{
                setInputName(user.name);
                setInputEmail(user.email);
            }
        }
        //eslint-disable-next-line
    },[userInfo,dispatch,user]);
    const handleUpdate=(e)=>{
        e.preventDefault()
        dispatch(userUpdate({id:user._id,name:inputName,email:inputEmail,password:inputPassword}))
    }
  return <>
            <div className="container my-40" style={{minHeight:'80vh'}}>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 py-20">
                        <h2 className='text-start'>Profile Info</h2>
                        <div className="card-body">
                            <img src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff" alt="profile" className='img-fluid profile-photo'/>
                            <h4 className="card-title py-2"><i className="fa-solid fa-user" /><span className="mx-2">{user.name}</span></h4>
                            <h4 className="card-text text-info"><i className="fa-solid fa-envelope" /><span className="mx-2">{user.email}</span></h4>
                        </div>
                    </div>
                    <div className="col-md-6 py-20">
                        <h2 className='text-center'>Update Account Information</h2>
                        <form onSubmit={handleUpdate} className='update-form my-5'>
                            <div className="input-box flexbox">
                            <div className="input-icon column-10">
                                <label htmlFor="updateName">
                                    <i className="fas fa-user" />
                                </label>
                            </div>
                            <div className="input-field column-90">
                                <input id="updateName" type="text" placeholder="Enter updated name" value={inputName} onChange={(e)=>setInputName(e.target.value)} />
                            </div>
                            </div>
                            <div className="input-box flexbox">
                            <div className="input-icon column-10">
                                <label htmlFor="updateEmail">
                                <i className="fas fa-envelope" />
                                </label>
                            </div>
                            <div className="input-field column-90">
                                <input id="updateEmail" type="email" placeholder="Enter updated Email" value={inputEmail} onChange={(e)=>setInputEmail(e.target.value)} />
                            </div>
                            </div>
                            <div className="input-box flexbox">
                                <div className="input-icon column-10">
                                    <label htmlFor="updatedPassword">
                                    <i className="fas fa-lock" />
                                    </label>
                                </div>
                                <div className="input-field column-80">
                                    <input id="updatedPassword" type={passwordView?'text':'password'} placeholder="Enter Account Password" value={inputPassword} onChange={(e)=>setInputPassword(e.target.value)} />
                                </div>
                                <div className="input-toggle-password column-10" onClick={()=>passwordView?setPasswordView(false):setPasswordView(true)}>
                                    <button>
                                        <i className="fas fa-eye-slash" />
                                    </button>
                                </div>
                            </div>
                            <div className="input-box flexbox">
                                <div className="input-icon column-10">
                                    <label htmlFor="conPassword">
                                    <i className="fas fa-lock" />
                                    </label>
                                </div>
                                <div className="input-field column-80">
                                    <input id="conPassword" type={passwordView?'text':'password'} placeholder="Re-enter your password" value={conPassword} onChange={(e)=>setConPassword(e.target.value)} />
                                </div>
                                <div className="input-toggle-password column-10" onClick={()=>passwordView?setPasswordView(false):setPasswordView(true)}>
                                    <button>
                                        <i className="fas fa-eye-slash" />
                                    </button>
                                </div>
                            </div>
                            <div className="button-submit">
                                <button type="submit" className="block">Update</button>
                            </div>
                        </form>       
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                {loading ?
                    <Loading /> : error ?
                    <Message type="danger" message={error}/> : (
                        <div className='col-12 py-5'>
                            <h2 className='text-start'>My Orders</h2>
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
                                    {myOrders.map((order,index)=>(
                                        <tr key={index} className='text-center'>
                                            <th scope="row">#{order._id.slice(19,24)}</th>
                                            <td>{moment(order.placedAt).format('Do MMMM , YYYY')}</td>
                                            <td>$ {order.totalPrice}</td>
                                            <td>{order.isPaid?<i className="fas fa-check text-success" />:<i className="fa-solid fa-xmark text-danger"/>}</td>
                                            <td>{order.isDelivered?<i className="fas fa-check text-success" />:<i className="fa-solid fa-xmark text-danger" />}</td>
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
                </div>
            </div>
        </>;
};

export default UserProfile;


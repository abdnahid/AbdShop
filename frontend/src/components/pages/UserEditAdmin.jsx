import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userDetails,userUpdateByAdmin } from '../../actions/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserEditAdmin = () => {
    const dispatch = useDispatch();
    const {id}=useParams();
    const navigate = useNavigate();
    const [inputName,setInputName]= useState("");
    const [inputEmail,setInputEmail]= useState("");
    const [inputIsAdmin,setInputIsAdmin]= useState(false);
    const detailsState = useSelector((state)=>state.userDetails);
    const {user}=detailsState
    const loginState = useSelector((state)=>state.userLogin);
    const {userInfo}=loginState
    const userUpdateState = useSelector((state)=>state.userUpdate);
    useEffect(()=>{
        if (!userInfo || !userInfo.isAdmin) {
            navigate("/");
        }else if(!user.name || user._id !== id){
            dispatch(userDetails(id));
        }else{
            setInputIsAdmin(user.isAdmin);
            setInputEmail(user.email);
            setInputName(user.name);
        }
        if (userUpdateState.userInfo) {
            toast.success("User Updated Successfully");
        }
        //eslint-disable-next-line
    },[userInfo,user,userUpdateState]);
    const handleUpdate=(e)=>{
        e.preventDefault()
        dispatch(userUpdateByAdmin({id:user._id,name:inputName,email:inputEmail,isAdmin:inputIsAdmin}));
    }
  return <>
            <div className="container my-40" style={{minHeight:'80vh'}}>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 py-20">
                        <h2 className='text-center'>Update User Information</h2>
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
                            <div className='input-box is-admin'>
                                <p>Is this user an admin?</p>
                                <div className="slideThree">  
                                    <input type="checkbox" id="slideThree" name="check" onChange={(e)=>setInputIsAdmin(e.target.checked)} checked={inputIsAdmin} />
                                    <label htmlFor="slideThree" />
                                </div>

                            </div>
                            <div className="button-submit">
                                <button type="submit" className="block">Update</button>
                            </div>
                            <ToastContainer position="bottom-right" autoClose={2000}/>
                        </form>       
                    </div>
                </div>
            </div>
        </>;
};

export default UserEditAdmin;


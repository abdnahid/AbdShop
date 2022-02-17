import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userUpdate,userDetails } from '../../actions/userActions';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputName,setInputName]= useState("");
    const [inputEmail,setInputEmail]= useState("");
    const [inputPassword,setInputPassword]= useState("");
    const [conPassword,setConPassword]= useState("");
    const [passwordView,setPasswordView]= useState(false);
    const detailsState = useSelector((state)=>state.userDetails);
    const {user}=detailsState
    const loginState = useSelector((state)=>state.userLogin);
    const {userInfo}=loginState
    useEffect(()=>{
        if (!userInfo) {
            navigate("/");
        }else{
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
                    <div className="card col-md-6 py-20">
                        <img src="" className="card-img-top" alt="" />
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">{user.email}</p>
                        </div>
                    </div>
                    <div className="col-md-6 py-20">
                        <h3 className='text-center'>Update Account Information</h3>
                        <form onSubmit={handleUpdate} className='update-form'>
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
            </div>
        </>;
};

export default UserProfile;


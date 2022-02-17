import React,{useState,useEffect} from 'react';
import Modal from "react-modal";
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { login,register } from '../../actions/userActions';
import Message from '../layout/Message';
import { closeModal } from '../../actions/modalActions';

Modal.setAppElement('#root');

const LoginRegister = () => {
  const dispatch = useDispatch();
  const [passwordView,setPasswordView]=useState(false);
  const [inputEmail,setInputEmail]=useState("");
  const [inputName,setInputName]=useState("");
  const [inputPassword,setInputPassword]=useState("");
  const loginState = useSelector((state)=>state.userLogin);
  const modalState = useSelector((state)=>state.loginModal);
  const [style,setStyle]=useState({
    loginParams:{
      visibility:'block',
      background:'var(--theme)'
    },
    registerParams:{
      visibility:'none',
      background:'#fff'
    }
  });
  useEffect(()=>{
    dispatch(closeModal());
    //eslint-disable-next-line
  },[loginState.userInfo])
  const handleLoginShow=()=> {
    setStyle({
      ...style,
      loginParams:{visibility:'block',background:'var(--theme)'},
      registerParams:{visibility:'none',background:'#fff'}
    });
  }
  const handleRegisterShow=()=> {
    setStyle({
      ...style,
      registerParams:{visibility:'block',background:'var(--theme)'},
      loginParams:{visibility:'none',background:'#fff'}
    });
  }
  const handleLoginSubmit = (e)=>{
    e.preventDefault();
    //dispatch login action
    dispatch(login(inputEmail,inputPassword));
    setInputEmail("");
    setInputPassword("");
  }
  const handleRegisterSubmit = (e)=>{
    e.preventDefault();
    //dispatch register action
    dispatch(register(inputName,inputEmail,inputPassword))
    setInputEmail("");
    setInputPassword("");
  }
  return (
      <Modal isOpen={modalState.isOpen} style={customStyles} onRequestClose={()=>dispatch(closeModal())}>
        <div className="login-modal" id="loginRegisterModal">
          <div className="flexbox">
            <div className="column-50">
              <button className="block login-button" onClick={handleLoginShow} style={{backgroundColor:style.loginParams.background}}>Sign In</button>
            </div>
            <div className="column-50">
              <button className="block register-button" onClick={handleRegisterShow} style={{backgroundColor:style.registerParams.background}}>Register</button>
            </div>
            <div className="login-register-body">
              {loginState.error ? 
                <Message type="login failed" message={loginState.error}></Message> :
                <form onSubmit={handleLoginSubmit} id="loginModalBody" style={{display:style.loginParams.visibility}}>
                  <div className="input-box flexbox">
                    <div className="input-icon column-10">
                      <label htmlFor="loginEmail">
                        <i className="fas fa-envelope" />
                      </label>
                    </div>
                    <div className="input-field column-90">
                      <input id="loginEmail" type="email" placeholder="Enter Account Email" value={inputEmail} onChange={(e)=>setInputEmail(e.target.value)}/>
                    </div>
                  </div>
                  <div className="input-box flexbox">
                    <div className="input-icon column-10">
                      <label htmlFor="loginPassword">
                        <i className="fas fa-lock" />
                      </label>
                    </div>
                    <div className="input-field column-80">
                      <input id="loginPassword" type={passwordView?'text':'password'} placeholder="Enter Account Password" value={inputPassword} onChange={(e)=>setInputPassword(e.target.value)}/>
                    </div>
                    <div className="input-toggle-password column-10" onClick={()=>passwordView?setPasswordView(false):setPasswordView(true)}>
                        <i className="fas fa-eye-slash" />
                    </div>
                    <div className="forgot-password my-20">
                      <Link to="/users/password-reset"><i className="far fa-frown-open" /> Forgot my password</Link>
                    </div>
                  </div>
                  <div className="button-submit">
                    <button type="submit" className="block my-20">Login</button>
                  </div>
                </form>}
              <form onSubmit={handleRegisterSubmit} id="registerModalBody" style={{display:style.registerParams.visibility}}>
                <div className="input-box flexbox">
                  <div className="input-icon column-10">
                    <label htmlFor="registerName">
                      <i className="fas fa-user" />
                    </label>
                  </div>
                  <div className="input-field column-90">
                    <input id="registerName" type="text" placeholder="Enter Account Email" value={inputName} onChange={(e)=>setInputName(e.target.value)} />
                  </div>
                </div>
                <div className="input-box flexbox">
                  <div className="input-icon column-10">
                    <label htmlFor="registerEmail">
                      <i className="fas fa-envelope" />
                    </label>
                  </div>
                  <div className="input-field column-90">
                    <input id="registerEmail" type="email" placeholder="Enter Account Email" value={inputEmail} onChange={(e)=>setInputEmail(e.target.value)} />
                  </div>
                </div>
                <div className="input-box flexbox">
                  <div className="input-icon column-10">
                    <label htmlFor="registerPassword">
                      <i className="fas fa-lock" />
                    </label>
                  </div>
                  <div className="input-field column-80">
                    <input id="registerPassword" type={passwordView?'text':'password'} placeholder="Enter Account Password" value={inputPassword} onChange={(e)=>setInputPassword(e.target.value)} />
                  </div>
                  <div className="input-toggle-password column-10" onClick={()=>passwordView?setPasswordView(false):setPasswordView(true)}>
                    <button>
                      <i className="fas fa-eye-slash" />
                    </button>
                  </div>
                </div>
                <div className="button-submit">
                  <button type="submit" className="block">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="close-modal">
          <button onClick={()=>dispatch(closeModal())}>
            <i className="fas fa-close" />
          </button>
        </div>
      </Modal>
    )
};

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex:1
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform:'translate(-50%,-50%)',
    border: 'none',
    background: '#fff',
    borderRadius: '4px',
    outline: 'none',
    padding: '0',
    width:'600px',
    height:'fit-content',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
  },
};


export default LoginRegister;

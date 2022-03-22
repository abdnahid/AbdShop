import React from 'react';
import { logout } from '../../actions/userActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Message = ({type,message}) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  return (
    <div className="row justify-content-center">
      <div className={`col-6 wrapper wrapper-${type}`}>
          <div className="wrappercard py-5">
              <div className="wrappericon"><i className="fas fa-exclamation-circle" /></div>
              <div className="wrappersubject">
                  <h3>{message}</h3>
                  <button className='btn btn-primary' onClick={()=>navigate("/")}>Go to homepage</button>
              </div>
              <div className="wrappericon-times" onClick={()=>dispatch(logout())}><i className="fas fa-times" /></div>
          </div>
      </div>
    </div>
  )
};

export default Message;

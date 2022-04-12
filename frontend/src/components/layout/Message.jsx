import React from 'react';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../actions/modalActions';
import { useDispatch } from 'react-redux';

const Message = ({type,message}) => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="row justify-content-center">
      <div className={`col wrapper wrapper-${type}`}>
          <div className="wrappercard py-5">
              <div className="wrappericon"><i className="fas fa-exclamation-circle" /></div>
              <div className="wrappersubject">
                  <h3>{message}</h3>
                  <button className='btn custom-theme-button' onClick={()=>dispatch(openModal())}>Login</button>
              </div>
              {/* <div className="wrappericon-times" onClick={()=>dispatch(logout())}><i className="fas fa-times" /></div> */}
          </div>
      </div>
    </div>
  )
};

export default Message;

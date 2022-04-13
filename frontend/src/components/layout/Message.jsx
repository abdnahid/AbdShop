import React from 'react';
import { openModal } from '../../actions/modalActions';
import { useDispatch } from 'react-redux';

const Message = ({type,message,login}) => {
  const dispatch = useDispatch();
  return (
    <div className="row justify-content-center">
      <div className={`col wrapper wrapper-${type}`}>
          <div className="wrappercard py-5">
              <div className="wrappericon"><i className="fas fa-exclamation-circle" /></div>
              <div className="wrappersubject">
                  <h3>{message}</h3>
                  {login && <button className='btn custom-theme-button' onClick={()=>dispatch(openModal())}>Login</button>}
              </div>
          </div>
      </div>
    </div>
  )
};

Message.defaultProps = {
  type:'info',
  message:'User not authorized',
  login:false
}

export default Message;

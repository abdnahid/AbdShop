import React from 'react';
import { logout } from '../../actions/userActions';
import { useDispatch } from 'react-redux';

const Message = ({type,message}) => {
  const dispatch=useDispatch();
  return (
    <>
        <div className={`col wrapper wrapper-${type}`}>
            <div className="wrappercard">
                <div className="wrappericon"><i className="fas fa-exclamation-circle" /></div>
                <div className="wrappersubject">
                    <h3>{type}</h3>
                    <p>{message}</p>
                </div>
                <div className="wrappericon-times" onClick={()=>dispatch(logout())}><i className="fas fa-times" /></div>
            </div>
        </div>
    </>
  )};

export default Message;

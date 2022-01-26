import React from 'react';

const Message = ({type,message}) => {
  return (
    <>
        <div className={`col-md-4 wrapper wrapper-${type}`}>
            <div className="wrappercard">
                <div className="wrappericon"><i className="fas fa-exclamation-circle" /></div>
                <div className="wrappersubject">
                    <h3>{type}</h3>
                    <p>{message}</p>
                </div>
                <div className="wrappericon-times"><i className="fas fa-times" /></div>
            </div>
        </div>
    </>
  )};

export default Message;

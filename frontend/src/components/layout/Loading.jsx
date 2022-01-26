import React from 'react';
import Loader from './loading.gif'

const Loading = () => {
  return (
    <div className='col-md-3'>
        <img src={Loader} alt="loading" className='img-fluid'/>
    </div>
  )
};

export default Loading;

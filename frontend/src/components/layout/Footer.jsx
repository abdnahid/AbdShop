import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='custom-bg-theme'>
      <div className="container">
        <div className="text-center p-3 text-white-50">
          © {year} AbdShop Corp. Ltd.
        </div>
      </div>
    </footer>
  )
};

export default Footer;

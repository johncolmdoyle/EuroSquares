import React from "react";

const Footer = () => {
  return (
      <div 
      style={{
        opacity: 0.7,
        bottom: 0,
        left: 0,
        width: '100%',
      }}>
        <div className="d-flex align-items-center flex-column justify-content-center p-2 fs-6">
        <a href="https://linkedin.com/in/johncolmdoyle">
          <i className="fab fa-linkedin me-3" />
        </a>
        <a href="https://github.com/johncolmdoyle">
          <i className="fa-brands fa-github me-3"></i>
        </a>
        <span>Created by John Doyle</span>
        </div>
      </div>
  );
};

export default Footer;
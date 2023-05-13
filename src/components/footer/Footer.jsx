import React from "react";

const Footer = () => {
  return (
    <footer className="d-flex align-items-center flex-column justify-content-center p-2 fs-6">
      <div>
        <a href="https://linkedin.com/in/johncolmdoyle">
          <i className="fab fa-linkedin me-3" />
        </a>
        <a href="https://github.com/johncolmdoyle">
          <i className="fa-brands fa-github me-3"></i>
        </a>
      </div>
      <article>Created by John Doyle</article>
    </footer>
  );
};

export default Footer;
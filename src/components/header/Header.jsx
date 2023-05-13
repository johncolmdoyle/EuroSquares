import React from "react";

import mainLogo from "../../assets/eurovision.png";

const Header = () => {
  return (
    <div>
      <div className="d-flex justify-content-evenly align-items-center">
      <img style={{ width: 500, height: 158 }} src={mainLogo} alt="Squares"/>
      </div>
    </div>
  );
};

export default Header;
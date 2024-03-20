import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.jpg";

const Footer = () => {
  return (
    <div className="footer">
      <img style={{ height: "100px", width: "auto" }} src={logo} />
      <p>©2021, Books. Tüm Hakları Saklıdır.</p>
    </div>
  );
};

export default Footer;

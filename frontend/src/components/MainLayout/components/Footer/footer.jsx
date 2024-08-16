import React from "react";
import "./footer.css";
import fb from "../../../../assets/face.png";
import twitter from "../../../../assets/tweet.png";
import linkedin from "../../../../assets/linkedin.png";
import insta from "../../../../assets/ig.png";

const Footer = ({ mobile, showMenu }) => {
  return (
    <footer className="footer" style={{ display: `${showMenu ? "none" : ""}` }}>
      <div className="container">
        <div className="footer-copyright">
          <p>
            @{new Date().getFullYear()} OffroadRentals. All right reserved.
          </p>
        </div>
        {!mobile && (
          <div className="socialmedia">
            <p>
              <img src={fb} alt="" />
            </p>
            <p>
              <img src={twitter} alt="" />
            </p>
            <p>
              <img src={linkedin} alt="" />
            </p>
            <p>
              <img src={insta} alt="" />
            </p>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;

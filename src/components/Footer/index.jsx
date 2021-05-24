import { Facebook, Instagram, LinkedIn, MailOutline, Phone, YouTube } from '@material-ui/icons';
import React from 'react';
import './index.scss';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="contact-wrapper">
          <div className="content-wrapper">
            <div className="icon-box">
              <MailOutline />
            </div>
            <p className="content-box">
              Email id <br /> xyz@gmail.com
            </p>
          </div>
          <div className="content-wrapper">
            <div className="icon-box">
              <Phone />
            </div>
            <p className="content-box">
              Phone no. <br /> 9876543210
            </p>
          </div>
        </div>
        <div className="social-media-wrapper">
          <div className="icon-box">
            <Instagram />
          </div>
          <div className="icon-box">
            <YouTube />
          </div>
          <div className="icon-box">
            <LinkedIn />
          </div>
          <div className="icon-box">
            <Facebook />
          </div>
        </div>
        <div className="foot-content">
          <span>Terms & Condition</span>|<span>Privacy Policy</span>|<span>Copyright Reserved @pankaj</span>|<span>Created by @aka-otaku-psc</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

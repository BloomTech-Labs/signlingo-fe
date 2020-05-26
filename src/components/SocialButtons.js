import React from "react";

import facebookF from "../images/icons/facebook_icon.png";
import googleG from "../images/icons/google_icon.png";

// unused component.  Was originally in the RC's however could not get 
// functionality to work on the backend to allow social media button signup/login
// left the base component to be built upon if needed
const SocialButtons = (props) => {
  return (
    <section className="socialBtns">
      <div className="facebookBtn">
        <img src={facebookF} alt="facebook letter f" id="fImage" /> Facebook
      </div>
      <div className="googleBtn">
        <img src={googleG} alt="google letter g" id="gImage" /> Google
      </div>
    </section>
  );
};

export default SocialButtons;

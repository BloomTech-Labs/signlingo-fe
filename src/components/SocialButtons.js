import React from "react";

import facebookF from "../images/icons/facebook_icon.png";
import googleG from "../images/icons/google_icon.png";

const SocialButtons = (props) => {
  return (
    <section className="socialBtns">
    <a href="www.facebook.com" target="_blank" className="facebookBtn">
      <img src={facebookF} alt="facebook letter f" id="fImage" /> Facebook
    </a>
    <a href="www.google.com" target="_blank" className="googleBtn">
      <img src={googleG} alt="google letter g" id="gImage" /> Google
    </a>
  </section>
  );
};

export default SocialButtons;

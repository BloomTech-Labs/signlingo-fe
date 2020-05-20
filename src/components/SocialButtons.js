import React from "react";

import facebookF from "../images/icons/facebook_icon.png";
import googleG from "../images/icons/google_icon.png";

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

import React, { useEffect, useState } from "react";
import axios from "axios";

import facebookF from "../images/icons/facebook_icon.png";
import googleG from "../images/icons/google_icon.png";

const SocialButtons = (props) => {
  const [google, setGoogle] = useState({});
  const [facebook, setFacebook] = useState({});

  useEffect(() => {
    axios
      .get("https://signlingobe-stag.herokuapp.com/api/auth/google")
      .then((res) => {
        console.log("response from google", res);
        setGoogle(res.data);
      });

    axios
      .get("https://signlingobe-stag.herokuapp.com/api/auth/facebook")
      .then((res) => {
        console.log("response from facebook", res);
        setFacebook(res.data);
      });
  }, []);

  return (
    <section className="socialBtns">
      <a href={facebook.facebook} className="facebookBtn">
        <img src={facebookF} alt="facebook letter f" id="fImage" /> Facebook
      </a>
      <a href={google.google} className="googleBtn">
        <img src={googleG} alt="google letter g" id="gImage" /> Google
      </a>
    </section>
  );
};

export default SocialButtons;

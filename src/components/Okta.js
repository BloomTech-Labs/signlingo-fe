import React from "react";

const Okta = (props) => {
  return (
    <section className="socialBtns">
      <div className="oktaBtn">
        <img src={process.env.PUBLIC_URL + '/images/icons/okta.png'} alt="okta sign in" id="oktaImage" />
      </div>
    </section>
  );
};

export default Okta;

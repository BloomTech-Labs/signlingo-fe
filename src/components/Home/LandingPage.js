import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import OktaJwtVerifier from "@okta/jwt-verifier";

const LandingPage = () => {
  let history = useHistory();
  const { authService } = useOktaAuth();
  const issuer = process.env.REACT_APP_ISSUER;
  let token = localStorage.getItem("okta-token-storage");
  // console.log(token.accessToken.expiresAt);
  const login = async () => {
    authService.login("/dashboard"); // this is where okta redirects after logging in
  };
  const tokenVerifier = new OktaJwtVerifier({
    issuer: issuer,
  });

  useEffect(() => {
    // TODO: add this verifier to other components (?) so that the access token is always checked on every page to make sure that it's still valid, otherwise route the user back to the login page.
    if (token) {
      console.log(token);
      tokenVerifier
      .verifyAccessToken(token.accessToken, "api://default")
      .then((jwt) => {
        // we don't need to do anything
        console.log(jwt)
      })
      .catch((err) => {
        //if there is an error, that means the token we tried to verify is no longer valid
        localStorage.removeItem("oktaUID");
        localStorage.removeItem("okta-token-storage");
        console.log(err)
      });
    }

  }, []);

  return (
    <>
      <div className="heroDiv">
        <img
          src={process.env.PUBLIC_URL + "/images/landing/hero1.png"}
          alt="hand"
        />
        <div className="heroText">
          <div id="logo">
            {" "}
            <b>Sign</b>
            <span>Lingo</span>
          </div>
          <div id="slogan">
            Learn to sign.
            <br />
            One day at a time.
          </div>
        </div>
        <div className="heroLogin"></div>
      </div>
      <div className="landingContent">
        {localStorage.getItem("oktaUID") ? (
          <div
            data-testid="signupLP"
            id="landingBtn"
            onClick={login}
          >
            Get started
          </div>
        ) : (
          <div data-testid="signupLP" id="landingBtn" onClick={login}>
            Get Started
          </div>
        )}

        <div className="landingBoxes">
          <section>
            <div>
              <img
                src={
                  process.env.PUBLIC_URL + "/images/icons/medalIconSmall.png"
                }
                alt="medal icon"
              />
            </div>
            <b>Fun gamified lessons</b>
            <p>
              Get a hot streak going, track your progress, earn points and lose
              hearts.
            </p>
          </section>

          <section>
            <div>
              <img
                src={
                  process.env.PUBLIC_URL + "/images/icons/personIconSmall.png"
                }
                alt="person icon"
              />
            </div>
            <b>Easy online learning</b>
            <p>
              SignLingo is available on mobile and desktop for your convenience!
            </p>
          </section>

          <section>
            <div>
              <img
                src={process.env.PUBLIC_URL + "/images/icons/examIconSmall.png"}
                alt="exam icon"
              />
            </div>
            <b>End of unit quizzes </b>
            <p>Quizzes at the end of each unit will help track your growth.</p>
          </section>

          <section>
            <div>
              <img
                src={process.env.PUBLIC_URL + "/images/icons/recIconSmall.png"}
                alt="rec icon"
              />
            </div>
            <b>Video recognition</b>
            <p>
              Our recognition software will tell you if you are signing
              correctly.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

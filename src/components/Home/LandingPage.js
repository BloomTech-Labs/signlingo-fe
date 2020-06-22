import { useOktaAuth } from "@okta/okta-react";
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  let history = useHistory();
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]); // Update if authState changes

  const login = async () => {
    authService.login("/");
  };

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {authState.isAuthenticated && !userInfo && (
        <div>Loading user information...</div>
      )}

      {!authState.isAuthenticated ? (
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
            <div className="heroLogin">
              {/* <p data-testid="loginLP" id="login" onClick={login}>
                Log in
              </p> */}
            </div>
          </div>
          <div className="landingContent">
            <div data-testid="signupLP" id="landingBtn" onClick={login}>
              Get Started
            </div>

            <div className="landingBoxes">
              <section>
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/icons/medalIconSmall.png"
                    }
                    alt="medal icon"
                  />
                </div>
                <b>Fun gamified lessons</b>
                <p>
                  Get a hot streak going, track your progress, earn points and
                  lose hearts.
                </p>
              </section>

              <section>
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/icons/personIconSmall.png"
                    }
                    alt="person icon"
                  />
                </div>
                <b>Easy online learning</b>
                <p>
                  SignLingo is available on mobile and desktop for your
                  convenience!
                </p>
              </section>

              <section>
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/icons/examIconSmall.png"
                    }
                    alt="exam icon"
                  />
                </div>
                <b>End of unit quizzes </b>
                <p>
                  Quizzes at the end of each unit will help track your growth.
                </p>
              </section>

              <section>
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/icons/recIconSmall.png"
                    }
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
      ) : (
        history.push("/dashboard")
      )}
    </>
  );
};

export default LandingPage;
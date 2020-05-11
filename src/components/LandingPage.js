import React from "react";
import { useHistory } from "react-router-dom";
import heroLg from "../images/heroImg_lg.png";
import examSm from "../images/icons/Exam Icon_sm.png";
import medalSm from "../images/icons/Medal icon_sm.png";
import personSm from "../images/icons/Person icon_sm.png";
import recSm from "../images/icons/Rec icon_sm.png";

const LandingPage = () => {
  const history = useHistory();

  return (
    <>
      <div className="heroDiv">
        <img src={heroLg} alt="hand" />
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
          <p
            data-testid="loginLP"
            id="login"
            onClick={() =>
              history.push({ pathname: "/account", state: { value: 1 } })
            }
          >
            Log in
          </p>
        </div>
      </div>

      <div className="landingContent">
        <div
          data-testid="signupLP"
          id="landingBtn"
          onClick={() =>
            history.push({ pathname: "/account", state: { value: 0 } })
          }
        >
          Sign up
        </div>

        <div className="landingBoxes">
          <section>
            <div>
              <img src={medalSm} alt="medal icon" />
            </div>
            <b>Fun gamified lessons</b>
            <p>
              Get a hot streak going, track your progress, earn points and lose
              hearts.
            </p>
          </section>

          <section>
            <div>
              <img src={personSm} alt="person icon" />
            </div>
            <b>Easy online learning</b>
            <p>
              SignLingo is available on mobile and desktop for your convenience!
            </p>
          </section>

          <section>
            <div>
              <img src={examSm} alt="exam icon" />
            </div>
            <b>End of unit quizzes </b>
            <p>Quizzes at the end of each unit will help track your growth.</p>
          </section>

          <section>
            <div>
              <img src={recSm} alt="rec icon" />
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

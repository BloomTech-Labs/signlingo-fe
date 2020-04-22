import React from "react";
import { useHistory } from "react-router-dom";
import heroSm from "../images/heroImg_sm.png";
import examSm from "../images/icons/Exam Icon_sm.png";
import medalSm from "../images/icons/Medal icon_sm.png";
import personSm from "../images/icons/Person icon_sm.png";
import recSm from "../images/icons/Rec icon_sm.png";
import trophySm from "../images/icons/Trophy Icon_sm.png";
import abcSm from "../images/icons/ABC Icon_sm.png";

const LandingPage = () => {
  const history = useHistory();

  return (
    <div>
      <img src={heroSm} alt="hand" />
      {/* landingContent groups everything on landing page EXCEPT for the hero image for padding reasons */}
      <div className="landingContent">
        <div id="landingBtn" onClick={() => history.push("/account")}>
          Sign up
        </div>
        <div className="landingBoxes">
          <section>
            <div>
              <img src={medalSm} alt="medal icon" />
            </div>
            <b>Fun gamified lessons </b>
            <p>
              Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.
            </p>
          </section>
          <section>
            <div>
              <img src={personSm} alt="person icon" />
            </div>
            <b>Easy online learning </b>
            <p>
              Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.
            </p>
          </section>
          <section>
            <div>
              <img src={abcSm} alt="abc icon" />
            </div>
            <b>Something curriculum </b>
            <p>
              Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.
            </p>
          </section>
          <section>
            <div>
              <img src={recSm} alt="rec icon" />
            </div>
            <b>Video recognition</b>
            <p>
              Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.
            </p>
          </section>
          <section>
            <div>
              <img src={examSm} alt="exam icon" />
            </div>
            <b>End of unit quizzes </b>
            <p>
              Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.
            </p>
          </section>
          <section>
            <div>
              <img src={trophySm} alt="trophy icon" />
            </div>
            <b>Something something</b>
            <p>
              Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

import React from 'react';
import heroSm from '../images/heroImg_sm.png';
import examSm from '../images/icons/Exam Icon_sm.png';
import medalSm from '../images/icons/Medal icon_sm.png';
import personSm from '../images/icons/Person icon_sm.png';
import recSm from '../images/icons/Rec icon_sm.png';
import trophySm from '../images/icons/Trophy Icon_sm.png';
import abcSm from '../images/icons/ABC Icon_sm.png';

const LandingPage = () => {

    return (
        <div>
            <img src={heroSm} alt="hand"/>
            {/* landingContent groups everything on landing page EXCEPT for the hero image for padding reasons */}
            <div className="landingContent">
                <button><p>Sign up</p></button>
                <section>
                    <img src={medalSm} alt="medal icon"/>
                    <b>Incididunt </b>
                    <p>Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.</p>
                </section>
                <section>
                    <img src={personSm} alt="person icon"/>
                    <b>Incididunt </b>
                    <p>Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.</p>
                </section>
                <section>
                    <img src={abcSm} alt="abc icon"/>
                    <b>Incididunt </b>
                    <p>Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.</p>
                </section>
                <section>
                    <img src={recSm} alt="rec icon"/>
                    <b>Incididunt </b>
                    <p>Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.</p>
                </section>
                <section>
                    <img src={examSm} alt="exam icon"/>
                    <b>Incididunt </b>
                    <p>Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.</p>
                </section>
                <section>
                    <img src={trophySm} alt="trophy icon"/>
                    <b>Incididunt </b>
                    <p>Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.</p>
                </section>
            </div>
        </div>
    )
}

export default LandingPage;
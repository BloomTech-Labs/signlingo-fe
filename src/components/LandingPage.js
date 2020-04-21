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
                <button id="signupBttn"> Sign up</button>
                <div id="landingCopy">
                    <div>
                        <img src={medalSm} alt="medal icon"/>
                        <p>Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.</p>
                    </div>
                    <div>
                        <img src={personSm} alt="person icon"/>
                        <p>Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.</p>
                    </div>
                    <div>
                        <img src={abcSm} alt="abc icon"/>
                        <p>Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.</p>
                    </div>
                    <div>
                        <img src={recSm} alt="rec icon"/>
                        <p>Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.</p>
                    </div>
                    <div>
                        <img src={examSm} alt="exam icon"/>
                        <p>Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.</p>
                    </div>
                    <div>
                        <img src={trophySm} alt="trophy icon"/>
                        <p>Incididunt ex ut ad laboris enim dolore reprehenderit ad in ipsum.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
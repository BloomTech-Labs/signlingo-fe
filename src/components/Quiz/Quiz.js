import React, {useState} from 'react';
import VideoAssessment from './VideoAssessment';
import Overlay from './Overlay.js';

//  TODO 
//  import ProgressBar and Lives component when its ready (RC 2 or 3) before that put a placeholder image
//  Need to build up overlays
//  Idea for currentTestValue: either passed down as props, or read from the URL params
const Quiz = (props) => {

    const [videoOn, setVideoOn] = useState(false);
    const [result, setResult] = useState();

    return (
        <div>
            <img src="./images/progressBar.png"/>
            <img src="./images/heart.png"/>
            <h1>{`Sign "${props.currentTestValue}"`}</h1>
            {result ? <Overlay result = {result}/> : null}
            {videoOn ? <VideoAssessment testValue = {currentTestValue}/> : 'Placeholder for tap to open'}
            <button>Next</button>
        </div>
    );
};

export default Quiz;



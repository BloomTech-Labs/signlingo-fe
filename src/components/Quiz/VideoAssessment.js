import React from "react";
import axios from "axios";
import Overlay from "./Overlay.js";

const VideoAssessment = (props) => {
  let mediaRecorder;
  let constraintObj = {
    audio: false,
    video: {
      facingMode: "user",
      width: { min: 640, ideal: 1280, max: 1920 },
      height: { min: 480, ideal: 720, max: 1080 },
    },
  };
  //handle older browsers that might implement getUserMedia in some way
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
    navigator.mediaDevices.getUserMedia = function (constraintObj) {
      let getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if (!getUserMedia) {
        return Promise.reject(
          new Error("getUserMedia is not implemented in this browser")
        );
      }
      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraintObj, resolve, reject);
      });
    };
  } else {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          // console.log(device.kind.toUpperCase(), device.label);
          //, device.deviceId
        });
      })
      .catch((err) => {
        console.log(err.name, err.message);
      });
  }
  // this is where we access the webcam
  navigator.mediaDevices
    .getUserMedia(constraintObj)
    .then(function (mediaStreamObj) {
      let video = document.querySelector("video");
      if ("srcObject" in video) {
        video.srcObject = mediaStreamObj;
      } else {
        //old version
        video.src = window.URL.createObjectURL(mediaStreamObj);
      }
      video.onloadedmetadata = function (ev) {
        video.play();
      };
      mediaRecorder = new MediaRecorder(mediaStreamObj);
      let chunks = [];
      mediaRecorder.ondataavailable = function (ev) {
        chunks.push(ev.data);
      };
      mediaRecorder.onstop = (ev) => {
        let blob = new Blob(chunks, { type: "video/mp4;" });
        chunks = [];
        // let videoURL = window.URL.createObjectURL(blob);
        // vidSave.src = videoURL;
        
        console.log("BLOB", blob)
        if (blob.size === 0) {
          // re record and create blob again
          start();      
        }
        let formData = new FormData();
        formData.append("video", blob);
        formData.append("expected", props.testValue);
        formData.append("right-handed", 1); // 0 for left handed, 1 for right handed DEFAULT right hand
        // const headers = {
        //   'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin': 'http://signlingo-ds-test.eba-neytpugq.us-east-1.elasticbeanstalk.com/api'
        // }
        axios
          .post(
            "https://ds.thesignlingo.com/api",
            formData, 
            // {
            //   headers: {
            //     'Content-Type': 'application/json',
            //     'Acces-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Origin': 'http://signlingo-ds-test.eba-neytpugq.us-east-1.elasticbeanstalk.com',
            //     'Access-Control-Expose-Headers': 'acces-control-allow-origin,content-type,date,server,content-length,connection,x-final-url,access-control-allow-origin',
            //   }
            // }
            )
            //https://cors-anywhere.herokuapp.com/
          .then((res) => {
            console.log(res.data);
            props.scoreHandler(res.data.is_match); //res.data.is_match
            props.setResult(res.data.is_match); //res.data.is_match
            props.setIsRecording(false);
          });
      };
    })
    .catch(function (err) {
      console.log(err.name, err.message, err);
    });
  const start = (ev) => {
    if (!props.isRecording) {
      mediaRecorder.start();
      props.setIsRecording(true);
      setTimeout(function () {
        mediaRecorder.stop();
        console.log("should have stopped recording");
      }, 300);
    }
      console.log(mediaRecorder.state);
  };
  return (
    <>
      <div className="overlayDiv">
        <video className="video"></video>
        {props.result === null ? null : (
          <Overlay data-testid="resultOverlay" result={props.result} />
        )}
      </div>
      {!props.videoOn && !props.result ? (
        <div className="roundbtn roundbtnGrey" id="recBtn">
          <div className="roundbtnCircle">Record</div>
        </div>
      ) : props.isRecording ? (
        <div className="spinner-box">
          <span id="loading">Loading...</span>
          <div className="circle-border">
            <div className="circle-core"></div>
          </div>
        </div>
      ) : props.result === null ? (
        <div onClick={start} className="roundbtn" id="recBtn">
          <div className="roundbtnCircle">Record</div>
        </div>
      ) : null}
    </>
  );
};
export default VideoAssessment;

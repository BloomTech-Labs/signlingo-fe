import React, { useState } from "react";
import axios from "axios";
import Overlay from "./Overlay.js";

const VideoAssessment = (props) => {
  let mediaRecorder;

  let constraintObj = {
    audio: false,
    video: {
      facingMode: "user",
      width: { min: 50, ideal: 50, max: 50 },
      height: { min: 50, ideal: 50, max: 50 },
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
        let videoURL = window.URL.createObjectURL(blob);
        // vidSave.src = videoURL;
        let formData = new FormData();
        formData.append("video", blob);
        axios.post("https://cors-anywhere.herokuapp.com/http://signlingods.us-east-1.elasticbeanstalk.com/test_api", formData)
          .then(res => {
            props.scoreHandler(res.data['Random Test Boolean']);
            props.setResult(res.data['Random Test Boolean']);
            console.log(res.data['Random Test Boolean']);
          })
          .catch(err => {
            console.log(err)
          })
        
      };
    })
    .catch(function (err) {
      console.log(err.name, err.message);
    });

  const start = (ev) => {
    if (!props.isRecording) {
      mediaRecorder.start();
      props.setIsRecording(true);
      setTimeout(function () {
        mediaRecorder.stop();
        // props.setIsRecording(false);
        console.log("should have stopped recording");
      }, 100);
    } 
    console.log(mediaRecorder.state);
  };

  return (
    <>
      {console.log("result", props.result)}
      {props.result === null ? null : <Overlay data-testid="resultOverlay" result={props.result} />}
      {props.isRecording ? null : <button onClick={start}>Start Recording</button>}
      <video style={{ height: "50%", width: "100%" }}></video>
      {/* <video id="vid2" controls></video> */}
    </>
  );
};

export default VideoAssessment;

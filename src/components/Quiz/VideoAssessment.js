import React, { useState } from "react";
import axios from "axios";
import * as handTrack from "handtrackjs";
import Overlay from "./Overlay.js";

const VideoAssessment = (props) => {
  let isRecording = false;
  const [result, setResult] = useState();

  let constraintObj = {
    audio: false,
    video: {
      facingMode: "user",
      width: { min: 50, ideal: 50, max: 50},
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
          console.log(device.kind.toUpperCase(), device.label);
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

      const modelParams = {
        flipHorizontal: true, // flip e.g for video
        imageScaleFactor: 0.7, // reduce input image size for gains in speed.
        maxNumBoxes: 20, // maximum number of boxes to detect
        iouThreshold: 0.5, // ioU threshold for non-max suppression
        scoreThreshold: 0.6, // confidence threshold for predictions.
      };

      if ("srcObject" in video) {
        video.srcObject = mediaStreamObj;
      } else {
        //old version
        video.src = window.URL.createObjectURL(mediaStreamObj);
      }

      // video.onloadedmetadata = function (ev) {
      //   video.play();
      // };

      // add listeners for saving video/audio
      let vidSave = document.getElementById("vid2");
      let mediaRecorder = new MediaRecorder(mediaStreamObj);
      // console.log(mediaRecorder)
      let chunks = [];
      let model;
      let tracking;

      // start webcam video stream on given video element. Returns a promise
      // that can be used to validate if user provided video permission.
      handTrack.startVideo(video).then((status) => {
        console.log("handtrack status", status)
        if (status) {
          navigator.getUserMedia(
            { video: {} },
            (stream) => {
              // video.srcObject = mediaStreamObj;
              tracking = setInterval(runDetection, 500);
            },
            (err) => console.log(err)
          );
        }
      });

      // load the model with optional params (found in modelParams above)
      handTrack.load(modelParams).then((lmodel) => {
        model = lmodel;
        console.log("video is loaded");
        model.detect(video).then((predictions) => {
          console.log("Predictions: ", predictions);
        });
      });

      //
      function runDetection() {
        model.detect(video).then((predictions) => {
          // check to see if desired object (hand) is visible for more then 2 seconds. 
          // that way we would not have to worry about the handtrackjs recognizing a face for a split second.
          if (predictions.length > 0 && !isRecording) {
            // May be a good idea to give users some visual feedback(blinking red) to let them know we're recording
            isRecording = true;
            clearInterval(tracking);
            mediaRecorder.start();
            setTimeout(function () {
              mediaRecorder.stop();
              isRecording = false;
              console.log("should have stopped recording")
            }, 200);
          }
        });
      }

      mediaRecorder.ondataavailable = function (ev) {
        chunks.push(ev.data);
      };

      mediaRecorder.onstop = (ev) => {
        let blob = new Blob(chunks, { type: "video/mp4;" });
        chunks = [];
        let videoURL = window.URL.createObjectURL(blob);
        vidSave.src = videoURL;
        let formData = new FormData();
        formData.append("videoStuff", videoURL);
        if (formData) {
          console.log(formData)
        } else {
          console.log("its empty!")
        }
        // axios.post("https://signlingoapi.eba-24kd3jtp.us-east-1.elasticbeanstalk.com/test_api", {"hello": blob})
        //   .then(res => {
        //     console.log("DS API response", res)
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
        props.scoreHandler(true)

        // also we now have access to props.testValue and props.scoreHandler
        // We could do the post request here and pass the recorded video to DS API
        // full screen posibilities like snapchat like bryan mentioned (Kendra was ok with this)
        // axios.post('api', blob).then()
      };
    })
    .catch(function (err) {
      console.log(err.name, err.message);
    });

  return (
    <>
      {result ? <Overlay data-testid="resultOverlay" result={result} /> : null}
      {!isRecording ? "Placeholder for recording icon" : null}
      <video style={{height: "50%", width: "100%"}}></video>
      <video id="vid2" controls></video>
    </>
  );
};

export default VideoAssessment;

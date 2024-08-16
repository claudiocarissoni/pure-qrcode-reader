import React from "react";
import "./qrreader.css";
import { useUserMedia } from "./useUserMedia";
//import { useState } from "react";
//import { useRef } from "react";

function VideoTest() {
  const { stream, error } = useUserMedia({ audio: false, video: true });

  const video = document.createElement("video");
  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
  const canvas = canvasElement.getContext("2d") as CanvasRenderingContext2D;

  video.srcObject = stream;

  function tick() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvasElement.hidden = false;
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;

      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);

  return (
    <>
      <div>
        <canvas id="canvas"></canvas>
      </div>
    </>
  );
}

export default VideoTest;

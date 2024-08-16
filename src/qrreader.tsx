import React from "react";
import "./qrreader.css";
import { Point } from "jsqr/dist/locator";
import jsQR from "jsqr";
import { useEffect } from "react";

function QRReader() {
  useEffect(() => {
    const video = document.createElement("video");
    const canvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    const canvas = canvasElement.getContext("2d") as CanvasRenderingContext2D;
    const loadingMessage = document.getElementById(
      "loadingMessage"
    ) as HTMLDivElement;
    const outputContainer = document.getElementById("output") as HTMLDivElement;
    const outputMessage = document.getElementById(
      "outputMessage"
    ) as HTMLDivElement;
    const outputData = document.getElementById("outputData") as HTMLSpanElement;

    function drawLine(begin: Point, end: Point, color: string) {
      canvas.beginPath();
      canvas.moveTo(begin.x, begin.y);
      canvas.lineTo(end.x, end.y);
      canvas.lineWidth = 4;
      canvas.strokeStyle = color;
      canvas.stroke();
    }

    function tick() {
      loadingMessage.innerText = "⌛ Loading video...";

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true;
        outputContainer.hidden = false;

        canvasElement.hidden = false;
        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;

        canvas.drawImage(
          video,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );

        var imageData = canvas.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          drawLine(
            code.location.topLeftCorner,
            code.location.topRightCorner,
            "#FF3B58"
          );
          drawLine(
            code.location.topRightCorner,
            code.location.bottomRightCorner,
            "#FF3B58"
          );
          drawLine(
            code.location.bottomRightCorner,
            code.location.bottomLeftCorner,
            "#FF3B58"
          );
          drawLine(
            code.location.bottomLeftCorner,
            code.location.topLeftCorner,
            "#FF3B58"
          );
          outputMessage.hidden = true;

          if (outputData.parentElement !== null) {
            outputData.parentElement.hidden = false;
          }

          outputData.innerText = code.data;
        } else {
          outputMessage.hidden = false;

          if (outputData.parentElement !== null) {
            outputData.parentElement.hidden = true;
          }
        }

        requestAnimationFrame(tick);
      }
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(function (stream) {
        video.srcObject = stream;
        video.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
        video.play();
        requestAnimationFrame(tick);
      });
  }, []);

  // Use facingMode: environment to attemt to get the front camera on phones

  return (
    <>
      <h1>jsQR Demo</h1>
      <a id="githubLink" href="https://github.com/cozmo/jsQR">
        View documentation on Github
      </a>
      <p>Pure JavaScript QR code decoding library.</p>
      <div id="loadingMessage">
        🎥 Unable to access video stream (please make sure you have a webcam
        enabled)
      </div>
      <canvas id="canvas" hidden></canvas>
      <div id="output" hidden>
        <div id="outputMessage">No QR code detected.</div>
        <div hidden>
          <b>Data:</b> <span id="outputData"></span>
        </div>
      </div>
    </>
  );
}

export {};

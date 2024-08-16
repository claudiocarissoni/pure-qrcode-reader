import React from "react";
import "./qrreader.css";
import "./App.css";
import { Point } from "jsqr/dist/locator";
import jsQR from "jsqr";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function QRReader2() {
  const [loadingMessageTxt, setloadingMessageTxt] = useState(
    "Non è possibile accedere alla videocamera"
  );
  const [loadingMessageHidden, setloadingMessageHidden] = useState(false);
  const [outputMessageHidden, setoutputMessageHidden] = useState(false);
  const [outputDataTxt, setoutputDataTxt] = useState("");
  const [outputDataParentHidden, setoutputDataParentHidden] = useState(false);
  const [outputContainerHidden, setoutputContainerHidden] = useState(true);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const navigate = useNavigate();

  const h = 0;
  const w = 0;

  useEffect(() => {
    startWebcam();
  }, []);

  function ChnagePage() {
    navigate("/ShowQRCodeData", { state: { key: "value" }, replace: true });
  }

  function ChnagePageHome() {
    navigate("/");
  }

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Request the front camera (selfie camera)
          frameRate: { ideal: 10, max: 15 },
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
      }
      setMediaStream(stream);
      requestAnimationFrame(tick);
    } catch (error) {
      console.error("Errore accesso alla videocamera", error);
    }
  };

  // Function to stop the webcam
  const StopWebcam = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);

      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  };

  function drawRectangular(
    canvasObj: CanvasRenderingContext2D,
    begin: Point,
    end: Point,
    color: string
  ) {
    if (canvasRef.current) {
      const canvasElement = canvasRef.current;
      const canvas = canvasElement.getContext("2d");
      if (canvas) {
        canvas.beginPath();
        canvas.lineWidth = 4;
        canvas.strokeStyle = color;
        canvas.fillStyle = "rgba(35, 255, 79, 0.6)";
        canvas.fillRect(begin.x, begin.y, end.x - begin.x, end.y - begin.y);
        canvas.stroke();
      }
    }
  }

  function tick() {
    setloadingMessageTxt("Inizializzazione videocamera...");

    if (videoRef.current && canvasRef.current) {
      const video: HTMLVideoElement = videoRef.current;
      const canvasElement: HTMLCanvasElement = canvasRef.current;
      const canvas = canvasElement.getContext("2d");

      if (canvas && video.videoWidth && video.videoHeight) {
        setloadingMessageHidden(true);
        setoutputContainerHidden(false);

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

        const imageData = canvas?.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );

        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code && code.data.length > 0) {
          console.log(
            "Grandezza immagine" + imageData.width + " x " + imageData.height
          );
          console.log("Data: " + code.data);

          drawRectangular(
            canvas,
            code.location.topRightCorner,
            code.location.bottomLeftCorner,
            "#23FF4F"
          );

          setoutputMessageHidden(true);
          setoutputDataParentHidden(false);
          setoutputDataTxt(code.data);

          console.log("Stop webcam");
          StopWebcam();
          ChnagePage();
        } else {
          setoutputMessageHidden(false);
          setoutputDataParentHidden(true);
        }
      }
    }

    requestAnimationFrame(tick);
  }

  return (
    <>
      <div className="App">
        <h1>Inquadro un QR Code</h1>

        <div id="loadingMessage" hidden={loadingMessageHidden}>
          {loadingMessageTxt}
        </div>

        <video id="video" ref={videoRef} autoPlay muted height={h} width={w} />
        <canvas id="canvas" ref={canvasRef}></canvas>

        <div id="output" hidden={outputContainerHidden}>
          <div id="outputMessage" hidden={outputMessageHidden}>
            Nessun QR code rilavato.
          </div>
          <div id="outputDataParent" hidden={outputDataParentHidden}>
            <b>Contenuto:</b> <span id="outputData">{outputDataTxt}</span>
          </div>
        </div>
        <p>
          <button className="button-style" onClick={ChnagePageHome}>
            Home
          </button>
        </p>
      </div>
    </>
  );
}

export default QRReader2;

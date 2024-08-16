import { useState } from "react";
import { useZxing } from "react-zxing";
import { useNavigate } from "react-router-dom";

export const BarcodeScanner = () => {
  const navigate = useNavigate();

  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [decodeError, setDecodeError] = useState("");

  function ChnagePage() {
    navigate("/");
  }

  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
    onDecodeError(decodeError) {
      setDecodeError(Date.now().toLocaleString() + " " + decodeError.message);
    },
    onError(error) {
      console.error("Errore generico BarcodeScanner");
    },
  });

  return (
    <>
      <div className="main_container">
        <div className="horizontally">
          <h1>Inquadro un QR Code</h1>

          <video className="video-element" ref={ref} />

          <div id="output">
            <p>
              <span>Last result:</span>
              <span>{result}</span>
            </p>
            <p>
              <span>Last eror:</span>
              <span>{decodeError}</span>
            </p>

            <p>
              <button className="button-style" onClick={ChnagePage}>
                Home
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

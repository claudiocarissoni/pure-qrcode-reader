import { useState } from "react";
import { useZxing } from "react-zxing";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const BarcodeScanner = () => {
  const navigate = useNavigate();

  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [decodeError, setDecodeError] = useState("");

  useEffect(() => {
    return () => {
      console.log("DESTROY CALLED");
    };
  }, []);

  function ChnagePage(dataValue: string) {
    console.log("Parametro passato iniziale:" + dataValue);
    navigate("/ShowQRCodeData", { state: { id: dataValue, color: "green" } });
  }

  function ChnagePageHome() {
    navigate("/");
  }

  const { ref } = useZxing({
    onDecodeResult(result) {
      ChnagePage(result.getText());
      //setResult(result.getText());
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
              <button className="button-style" onClick={ChnagePageHome}>
                Home
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

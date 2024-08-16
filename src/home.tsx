import { useNavigate } from "react-router-dom";
import "./qrreader.css";

export default function HomePage() {
  const navigate = useNavigate();

  function handleClickPure() {
    navigate("/qrreader2");
  }

  function handleClickReact() {
    navigate("/qrreader3");
  }

  return (
    <>
      <div className="main_container">
        <div className="horizontally">
          <h1>Lettore di codici QR</h1>
          <p></p>
          <h2>Selezionare il tipo di lettore</h2>
          <p></p>
        </div>

        <div className="horizontally">
          <button
            type="button"
            className="button-style"
            onClick={handleClickPure}
          >
            Lettore JS puro
          </button>
        </div>

        <div className="horizontally">
          <button
            type="button"
            className="button-style"
            onClick={handleClickReact}
          >
            Lettore React Component
          </button>
        </div>
      </div>
    </>
  );
}

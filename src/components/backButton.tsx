import { useNavigate } from "react-router-dom";

export default function HomeButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Torna Indietro
    </button>
  );
}

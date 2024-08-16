import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ShowQRCodeData() {
  const navigate = useNavigate();
  let location = useLocation();

  console.log("Valore passato " + location.state);

  function ChnagePage() {
    navigate("/");
  }

  return (
    <>
      <h1>Dettaglio codice QR</h1>

      <button onClick={ChnagePage}>Home</button>
    </>
  );
}

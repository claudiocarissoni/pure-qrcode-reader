import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ShowQRCodeData() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dataRead = state.id;
  console.log("Valore passato " + dataRead);

  function ChnagePage() {
    navigate("/");
  }

  return (
    <>
      <div className="main_container">
        <div className="horizontally">
          <h2>Contenuto codice QR</h2>
          <p>{dataRead}</p>
          <button className="button-style" onClick={ChnagePage}>
            Home
          </button>
        </div>
      </div>
    </>
  );
}

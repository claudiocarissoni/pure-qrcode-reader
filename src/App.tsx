import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRReader2 from "./qrreader2";
import ShowQRCodeData from "./components/ShowQRCodeData";
import { BarcodeScanner } from "./qrreader3";
import HomePage from "./home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/qrreader2" element={<QRReader2 />} />
        <Route path="/qrreader3" element={<BarcodeScanner />} />
        <Route path="/ShowQRCodeData" element={<ShowQRCodeData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

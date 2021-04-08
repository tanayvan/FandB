import React from "react";
import Footer from "../Components/Footer";
import Home from "../Components/Home";
import Navbar from "../Components/Navbar";

export default function HomePage() {
  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.europosters.eu/image/1300/wall-murals/brick-wall-white-312x219-cm-130g-m2-vlies-non-woven-i39966.jpg")`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        flexFlow: "column",
        height: "100%",
        // backgroundSize: ,
      }}
    >
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

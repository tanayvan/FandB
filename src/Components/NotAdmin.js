import React from "react";
import Footer from "./Footer";
import Navbar2 from "./Navbar2";

export default function NotAdmin() {
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
      <Navbar2 />
      <div style={{ flexGrow: 1, margin: "20px 0px" }}>
        <h1 className="textCenter">You are not admin</h1>
      </div>
      <Footer />
    </div>
  );
}

import React from "react";
import Cart from "../Components/Cart";
import Footer from "../Components/Footer";
import Navbar2 from "../Components/Navbar2";

export default function CartPage() {
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
      <Cart />
      <Footer />
    </div>
    // <div
    //   style={{
    //     display: "flex",
    //     flexFlow: "column",
    //     height: "100%",
    //     backgroundColor: "pink",
    //   }}
    // >
    //   <div style={{ backgroundColor: "red", flex: "0 1 100px" }}>hh</div>
    //   <div style={{ backgroundColor: "blue", flex: "1 1 auto" }}>saf</div>
    //   df
    // </div>
  );
}

import React from "react";
import Checkout from "../Components/Checkout";
import Footer from "../Components/Footer";
import Navbar2 from "../Components/Navbar2";

export default function CheckoutPage() {
  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.europosters.eu/image/1300/wall-murals/brick-wall-white-312x219-cm-130g-m2-vlies-non-woven-i39966.jpg")`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        flexFlow: "column",
        height: "100%",
      }}
    >
      <Navbar2 />
      <Checkout />
      <Footer />
    </div>
  );
}

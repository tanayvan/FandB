import React, { useContext } from "react";
import Lottie from "react-lottie";
import coffeeLoading from "../Config/coffeeLoading.json";

import Footer from "../Components/Footer";
import Home from "../Components/Home";
import Navbar from "../Components/Navbar";
import cartContext from "../context";

export default function HomePage() {
  const { products } = useContext(cartContext);

  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.europosters.eu/image/1300/wall-murals/brick-wall-white-312x219-cm-130g-m2-vlies-non-woven-i39966.jpg")`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        flexFlow: "column",
        height: !products ? "100%" : "auto",
      }}
    >
      <Navbar />
      {products && <Home />}
      {!products && (
        <div style={{ flexGrow: 1 }}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: coffeeLoading,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            width={350}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

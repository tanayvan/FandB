import React, { useState } from "react";
import Lottie from "react-lottie";
import coffeeLoading from "../Config/coffeeLoading.json";

import Footer from "../Components/Footer";
import Home from "../Components/Home";
import Navbar from "../Components/Navbar";

export default function HomePage() {
  const [loading, setLoading] = useState(false);

  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.europosters.eu/image/1300/wall-murals/brick-wall-white-312x219-cm-130g-m2-vlies-non-woven-i39966.jpg")`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        flexFlow: "column",
        height: loading ? "100%" : "auto",
      }}
    >
      <Navbar />
      <Home changeLoading={setLoading} loading={loading} />
      {loading && (
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

import React, { useState } from "react";
import Lottie from "react-lottie";
import Adminorders from "../Components/Adminorders";
import Footer from "../Components/Footer";
import Navbar2 from "../Components/Navbar2";
import coffeeLoading from "../Config/coffeeLoading.json";

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [length, setLength] = useState(0);

  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.europosters.eu/image/1300/wall-murals/brick-wall-white-312x219-cm-130g-m2-vlies-non-woven-i39966.jpg")`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        flexFlow: "column",
        height: loading ? "100%" : length > 0 ? "auto" : "100%",
      }}
    >
      <Navbar2 />

      <Adminorders
        setLoading={setLoading}
        loading={loading}
        setLength={setLength}
      />
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

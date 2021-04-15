import { Container } from "@material-ui/core";
import React from "react";
import QRCode from "qrcode.react";

import Footer from "../Components/Footer";
import Navbar2 from "../Components/Navbar2";

export default function AboutPage() {
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

      <div style={{ flexGrow: 1, margin: "20px 0px" }}>
        <Container
          maxWidth="md"
          style={{
            textAlign: "center",
            backgroundColor: "#F4F4F4",
            border: "1px solid #e8e8e8",
            padding: "30px 0px",
          }}
        >
          <p style={{ fontSize: 25 }}>About</p>
          <QRCode value="https://chayoos-frontend.vercel.app/" />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

import { Container, Grid } from "@material-ui/core";
import React from "react";
import Lottie from "react-lottie";
import orderPlaced from "../Config/orderPlaced.json";
import { useHistory } from "react-router";

import Footer from "../Components/Footer";
import Navbar2 from "../Components/Navbar2";
import AppButton from "../Components/AppButton";

export default function OrderPlaced() {
  const history = useHistory();

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

      <div style={{ flexGrow: 1, margin: "10px 0px" }}>
        <Container
          maxWidth="xs"
          style={{
            textAlign: "center",
            backgroundColor: "#F4F4F4",
            border: "1px solid #e8e8e8",
          }}
        >
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: orderPlaced,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            width={200}
            height={200}
          />
          <p style={{ fontSize: 25 }}>Order Placed</p>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <AppButton padding="10px 0px " onClick={() => history.push("/")}>
                Menu
              </AppButton>
            </Grid>
            <Grid item xs={6}>
              <AppButton
                padding="10px 0px "
                onClick={() => history.push("/myorders")}
              >
                Your Orders
              </AppButton>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

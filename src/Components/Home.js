import { Container, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";

import cartContext from "../context";

import AppCard from "./AppCard";
import CustomizeItemModal from "./CustomizeItemModal";

export default function Home() {
  const { cart, products, user } = useContext(cartContext);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {}, []);

  return (
    <div style={{ margin: "30px 0px" }}>
      <Container maxWidth="lg">
        <Grid spacing={2} container>
          {products.length > 0 &&
            products.map((product, index) => {
              let InCart = cart.filter(
                (item) => item["product"]["_id"] === product._id
              );
              let no = 0;
              if (InCart.length > 0) {
                InCart.forEach((item) => {
                  no = no + item.quantity;
                });
              }

              return (
                <Grid
                  style={{
                    display: "flex",

                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  key={index.toString()}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <AppCard
                    onAddPress={() => {
                      setSelected(index);
                      setCartModalVisible(true);
                    }}
                    quantity={no}
                    product={product}
                    admin={user ? user.role : 0}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Container>
      {products.length > 0 && (
        <CustomizeItemModal
          title={products[selected].name}
          subtitle={products[selected].description}
          price={products[selected].price}
          visible={cartModalVisible}
          closeModal={() => setCartModalVisible(false)}
          product={products[selected]}
        />
      )}
    </div>
  );
}

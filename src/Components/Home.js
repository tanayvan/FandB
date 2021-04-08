import { Container, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import cartContext from "../context";
import { getAllProducts } from "../Helper/apicalls";
import AppCard from "./AppCard";
import CustomizeItemModal from "./CustomizeItemModal";

export default function Home() {
  const { cart, orderType } = useContext(cartContext);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (orderType && orderType.branch) {
      getAllProducts().then((data) => {
        if (data.error) {
          console.log(data.error);
        }

        setProducts(data);
      });
    }
  }, [orderType]);
  return (
    <div style={{ margin: "30px 0px", flexGrow: 1 }}>
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
                    title={product.name}
                    subtitle={product.description}
                    photo={product.photo}
                    price={product.price}
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

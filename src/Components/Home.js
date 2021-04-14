import { Container, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Scrollspy from "react-scrollspy";

import cartContext from "../context";

import AppCard from "./AppCard";
import CustomizeItemModal from "./CustomizeItemModal";

export default function Home() {
  const { cart, products, user, categories } = useContext(cartContext);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {}, []);

  return (
    <>
      <Scrollspy
        items={categories.map((a) => a.name.replace(" ", ""))}
        currentClassName="activeCategory"
        style={{
          display: "flex",
          backgroundColor: " rgb(75 105 54)",
          margin: 0,
          justifyContent: "center",
          // position: "-webkit-sticky",
          position: "sticky",
          top: 0,
          zIndex: 2,
          overflow: "auto",
        }}
      >
        {categories.map((category) => (
          <a
            style={{
              padding: 10,
              textDecoration: "none",
              color: "white",
              minWidth: "fit-content",
            }}
            href={`#${category.name.replace(" ", "")}`}
          >
            {category.name}
          </a>
        ))}
      </Scrollspy>
      <div style={{ margin: "30px 0px", zindex: 1 }}>
        <Container maxWidth="lg">
          {categories.map((category, index) => {
            var result = products.filter((obj) => {
              return obj.category.name === category.name;
            });

            return (
              <>
                <p
                  id={`${category.name.replace(" ", "")}`}
                  style={{ fontSize: 20 }}
                >
                  {category.name}
                </p>
                <Grid spacing={2} container key={index.toString()}>
                  {result.map((product, index) => {
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
                            var result = products
                              .map(function (e) {
                                return e._id;
                              })
                              .indexOf(product._id);

                            setSelected(result);
                            setCartModalVisible(true);
                          }}
                          quantity={no}
                          product={product}
                          admin={user ? user.role : null}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            );
          })}
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
    </>
  );
}

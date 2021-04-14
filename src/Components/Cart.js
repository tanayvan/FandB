import { Button, Container, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Color from "../Config/Color";
import cartContext from "../context";
import CartItem from "./CartItem";

export default function Cart() {
  const history = useHistory();
  const { cart, user } = useContext(cartContext);
  const [total, setTotal] = useState(0);
  const cartItems = cart;

  useEffect(() => {
    function sum() {
      var total = 0;
      cart.forEach((item) => {
        total = total + item.product.price * item.quantity;
      });
      return total;
    }
    const total = sum();
    setTotal(total);
  }, [cart]);

  return (
    <div style={{ flexGrow: 1, margin: 20 }}>
      {cart.length === 0 && (
        <Container
          maxWidth="sm"
          style={{
            textAlign: "center",
            backgroundColor: "white",
            padding: "10px 0px",
          }}
        >
          <p style={{ fontSize: 25 }}>My Cart</p>
          <img
            src="https://www.sngcrafts.com/uploads/emptycart.png"
            style={{ color: "red", opacity: 0.3, height: 100 }}
            alt="empty cart"
          />
          <p style={{ fontSize: 20 }}>
            Your cart is empty. <br />
            <span style={{ fontSize: 16, color: "grey" }}>
              Try some delicious food from our menu
            </span>
          </p>
          <Button
            style={{ backgroundColor: Color.green, color: "white" }}
            onClick={() => history.push("/")}
          >
            Go To Menu
          </Button>
        </Container>
      )}
      {cart.length > 0 && (
        <Container maxWidth="md" style={{ backgroundColor: "#F4F4F4" }}>
          <p className="textCenter" style={{ fontSize: 25 }}>
            My Cart
          </p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <div className="cartBox">{`Total ${cartItems.length} Items`}</div>
              {cartItems.map((item, index) => (
                <CartItem item={item} index={index} />
              ))}
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* <div className="cartBox" style={{ fontSize: 14 }}>
                INSTRUCTIONS
              </div>
              <div className="cartBox">
                <input
                  placeholder="Add Instructions"
                  style={{ border: "none", outline: "none" }}
                />
              </div> */}
              <div className="cartBox" style={{ fontSize: 14 }}>
                {`PRICE DETAIL`}
              </div>
              <div className="cartBox">
                {cart && <div style={{ color: "grey" }}>{`${total}`}</div>}
              </div>
              <div style={{ margin: "10px 0px 0px 0px " }}>
                <Button
                  style={{
                    backgroundColor: Color.green,
                    color: "white",
                    width: "100%",
                  }}
                  onClick={() => {
                    if (!user) {
                      history.push("/login");
                      return;
                    }
                    history.push("/checkout");
                  }}
                >
                  Proceed To Checkout
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
}

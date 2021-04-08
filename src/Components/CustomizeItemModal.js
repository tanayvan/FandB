import { Button, Grid, Icon, IconButton, Modal } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import React, { useContext, useState } from "react";
import cartContext from "../context";
import Customiztion from "./Customiztion";
import "./My.css";

export default function CustomizeItemModal({
  visible,
  closeModal,
  title,
  subtitle,
  price,
  product,
}) {
  const [itemQuantity, setItemQuantity] = useState(1);
  const [size, setSize] = useState("Regular");
  const [sugar, setSugar] = useState("Regular");
  const [milk, setMilk] = useState("Regular");
  const { cart, setCart } = useContext(cartContext);
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    // {
    //     product: product,
    //     size: size,
    //     sugar: sugar,
    //     milk: milk,
    //   }
    var isPresent = false;
    cart.forEach((cart) => {
      if (
        cart.product._id == product._id &&
        cart.milk == milk &&
        cart.size == size &&
        cart.sugar == sugar
      ) {
        cart.quantity = cart.quantity + 1;
        setCart(cart);
        isPresent = true;
        localStorage.setItem("cart", JSON.stringify(cart));
        return;
      }
    });
    !isPresent &&
      cart.push({
        product: product,
        size: size,
        sugar: sugar,
        milk: milk,
        quantity: 1,
      });
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    closeModal();
  };

  return (
    <Modal
      open={visible}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          maxWidth: 500,
          outline: "none",
          height: "90%",
          overflow: "auto",
          borderRadius: 5,
          width: "-webkit-fill-available",
        }}
      >
        <h3 style={{ fontWeight: "400" }} className="textCenter">
          Customize Item
        </h3>

        <div className="cardDetail" style={{ backgroundColor: "#F4F4F4" }}>
          <div className="cardTitle">
            {title}
            <div className="cardSubTitle">{subtitle}</div>
          </div>
          <div style={{ alignSelf: "center" }}>
            <div style={{ textAlign: "center" }}>
              &#8377; {price * itemQuantity}
            </div>
            <div
              style={{
                backgroundColor: "white",
                border: "2px solid #5E7E47",
                borderRadius: 20,
                margin: "10px 5px",
                display: "flex",
              }}
            >
              <div>
                <Button
                  style={{
                    padding: 0,
                    margin: 0,
                    minWidth: 25,
                  }}
                  onClick={() => {
                    if (itemQuantity == 1) {
                      closeModal();
                      return;
                    }
                    setItemQuantity(itemQuantity - 1);
                  }}
                >
                  <Icon>remove</Icon>
                </Button>
              </div>

              <div
                style={{
                  backgroundColor: "#5E7E47",
                  padding: "3px 10px",
                  color: "white",
                }}
              >
                {itemQuantity}
              </div>
              <div>
                <Button
                  style={{
                    padding: 0,
                    margin: 0,
                    minWidth: 25,
                  }}
                  // style={{
                  //   padding: "5px 10px",
                  //   border: "2px solid black",
                  //   margin: "15px 5px 0px 0px",
                  //   borderRadius: 20,
                  // }}
                  onClick={() => setItemQuantity(itemQuantity + 1)}
                >
                  <Icon>add</Icon>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Customiztion
          onChange={(data) => setSize(data)}
          title="Size"
          options={[
            { name: "Regular", quantity: "200ml" },
            { name: "Full", quantity: "400ml" },
            { name: "Kitli", quantity: "4 serves" },
          ]}
        />
        <Customiztion
          onChange={(data) => setSugar(data)}
          title="Sugar"
          options={[{ name: "Regular Sugar" }, { name: "Extra Sugar" }]}
        />
        <Customiztion
          onChange={(data) => setMilk(data)}
          title="Milk"
          options={[{ name: "Regular" }, { name: "Extra" }, { name: "less" }]}
        />
        <Grid container style={{ textAlign: "center", margin: "20px 0px" }}>
          <Grid item xs={6}>
            <Button
              style={{
                color: "#5e7e47",
                border: "1px solid #5e7e47",
                textTransform: "capitalize",
                fontSize: 16,
              }}
              className="modalButton"
              onClick={() => closeModal()}
            >
              Canel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => handleAddToCart()}
              style={{
                backgroundColor: "#5e7e47",
                color: "white",
                textTransform: "capitalize",
                fontSize: 16,
              }}
              className="modalButton"
            >
              Add to cart
            </Button>
          </Grid>
        </Grid>
        <div style={{ textAlign: "end", marginRight: 30 }}>
          <IconButton
            style={{ position: "absolute", top: 30 }}
            edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => closeModal()}
          >
            <Icon>close</Icon>
          </IconButton>
        </div>
      </div>
    </Modal>
  );
}

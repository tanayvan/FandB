import { Avatar, Button, Icon } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useContext, useState } from "react";
import Color from "../Config/Color";
import cartContext from "../context";
import "./My.css";

export default function CartItem({ item, index }) {
  const { cart, setCart } = useContext(cartContext);
  const [quantity, setQuantity] = useState(item.quantity);
  const handleRemove = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  };
  const addQuantity = () => {
    let cart_data = [...cart];

    cart_data[index].quantity = cart_data[index].quantity + 1;
    setQuantity(quantity + 1);

    localStorage.setItem("cart", JSON.stringify(cart_data));
    setCart(cart_data);
  };
  const removeQuantity = () => {
    if (quantity == 1) {
      handleRemove();
      return;
    }
    if (quantity > 0) {
      let cart_data = [...cart];

      cart_data[index].quantity = cart_data[index].quantity - 1;

      setQuantity(quantity - 1);

      localStorage.setItem("cart", JSON.stringify(cart_data));
      setCart(cart_data);
    }
  };
  return (
    <div className="cartBox">
      <div className="cardDetail" style={{ padding: 0 }}>
        <div className="cardTitle">
          <div style={{ display: "flex", alignItems: "center", fontSize: 18 }}>
            <Avatar
              variant="square"
              src={item.product.photo}
              style={{ margin: "0px 5px" }}
            />
            {item.product.name}
          </div>
          <div style={{ fontSize: 14, margin: "5px 5px", color: "grey" }}>
            <span>{`Milk: ${item.milk}`}</span>{" "}
            <span style={{ margin: "0 7px" }}> {` Sugar: ${item.sugar} `}</span>
            <span style={{ margin: "0 7px" }}> {`Size: ${item.size}`}</span>
          </div>

          <div
            style={{ margin: "0px 5px", color: Color.green, cursor: "pointer" }}
            onClick={handleRemove}
          >
            Remove
          </div>
        </div>
        <div style={{ alignSelf: "center" }}>
          <div style={{ textAlign: "center" }}>
            &#8377; {item.product.price}
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
                onClick={removeQuantity}
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
              {quantity}
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
                // onClick={() => setItemQuantity(itemQuantity + 1)}
                onClick={addQuantity}
              >
                <Icon>add</Icon>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

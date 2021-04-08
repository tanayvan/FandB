import { Avatar } from "@material-ui/core";
import React from "react";
import "./My.css";

export default function OrderItem({ item }) {
  return (
    <div className="cartBox">
      <div className="cardDetail" style={{ padding: "0px 10px" }}>
        <div className="cardTitle">
          <div style={{ display: "flex", fontSize: 18 }}>
            <Avatar
              variant="square"
              src={item.product.photo}
              style={{ margin: "0px 10px", height: 80, width: 80 }}
            />

            <div>
              <div>{item.product.name}</div>
              <div style={{ fontSize: 14, margin: "10px 0px", color: "grey" }}>
                <span>{`Milk: ${item.milk}`}</span>{" "}
                <span style={{ margin: "0 7px" }}>
                  {" "}
                  {` Sugar: ${item.sugar} `}
                </span>
                <span style={{ margin: "0 7px" }}> {`Size: ${item.size}`}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ alignSelf: "center" }}>
          <div style={{ textAlign: "center" }}>
            {" "}
            &#8377; {item.product.price}
          </div>
          <div
            style={{
              backgroundColor: "white",
              // border: "2px solid #5E7E47",

              margin: "10px 5px",
              display: "flex",
              overflow: "hidden",
            }}
          >
            Qty :
            <div
              style={{
                // height: 10,
                backgroundColor: "#5E7E47",
                padding: "3px 10px",
                borderRadius: 20,
                color: "white",
                margin: "0px 10px",
              }}
            >
              {item.quantity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

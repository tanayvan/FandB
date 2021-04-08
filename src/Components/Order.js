import { Grid } from "@material-ui/core";
import React from "react";
import OrderItem from "./OrderItem";

export default function Order({ branch, type, amount, date, items }) {
  return (
    <div style={{ margin: "50px 0px" }}>
      <div className="cartBox" style={{ backgroundColor: "#F4F4F4" }}>
        <Grid container className="textCenter" spacing={2}>
          <Grid item xs={6} sm={3}>
            <div style={{ fontSize: 14, color: "grey" }}>Order Placed</div>
            <div>{date}</div>
          </Grid>
          <Grid item xs={6} sm={3}>
            <div style={{ fontSize: 14, color: "grey" }}>
              Branch &amp; Order Type
            </div>
            <div>
              {" "}
              {branch} - {type}
            </div>
          </Grid>
          <Grid item xs={6} sm={3}>
            <div style={{ fontSize: 14, color: "grey" }}>Table</div>
            <div>NA</div>
          </Grid>
          <Grid item xs={6} sm={3}>
            <div style={{ fontSize: 14, color: "grey" }}>Total</div>
            <div style={{ fontWeight: "bold" }}> &#8377; {amount}</div>
          </Grid>
        </Grid>
      </div>
      {items.map((item) => {
        return <OrderItem item={item} />;
      })}
      {/* <OrderItem /> */}
    </div>
  );
}

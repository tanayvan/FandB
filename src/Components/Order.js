import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import cartContext from "../context";
import OrderItem from "./OrderItem";

export default function Order({
  branch,
  type,
  amount,
  date,
  items,
  table,
  payment,
  instructions,
}) {
  const { products } = useContext(cartContext);

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
            <div>{table ? table : "NA"}</div>
          </Grid>
          <Grid item xs={6} sm={3}>
            <div style={{ fontSize: 14, color: "grey" }}>Total</div>
            <div style={{ fontWeight: "bold" }}> &#8377; {amount}</div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ fontSize: 14, color: "grey" }}>Payment</div>
            <div>{payment}</div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ fontSize: 14, color: "grey" }}>Instructions</div>
            <div>{instructions !== "false" ? instructions : "NA"}</div>
          </Grid>
        </Grid>
      </div>
      {items.map((item, index) => {
        let finalItem = { ...item };
        let productDetail = products.find((x) => x._id === item.product);
        finalItem.product = productDetail;
        console.log("yay", finalItem);
        return <OrderItem item={finalItem} key={index.toString()} />;
      })}
      {/* <OrderItem /> */}
    </div>
  );
}

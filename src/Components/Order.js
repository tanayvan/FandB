import { Grid } from "@material-ui/core";
import React, { useContext, useState } from "react";
import cartContext from "../context";
import AppButton from "./AppButton";
import OrderItem from "./OrderItem";
import { CancelOrder, CompletedOrder } from "../Helper/apicalls";

export default function Order({
  date,

  status,
  time,
  list,
  orders,
  setOrders,
  admin,
}) {
  const { user } = useContext(cartContext);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const onCompletedOrder = () => {
    setLoading2(true);
    CompletedOrder(list._id, user.id, user.token, { status: "Completed" }).then(
      (data) => {
        if (data.error) {
          console.log("error completing order", data);
          setLoading2(false);
          return;
        }
        let objIndex = orders.findIndex((obj) => obj._id === list._id);
        let update = [...orders];
        update[objIndex].status = "Completed";
        setOrders(update);
        setLoading2(false);
      }
    );
  };

  const onCancelOrder = () => {
    setLoading(true);
    CancelOrder(list._id, user.id, user.token).then((data) => {
      if (data.error) {
        console.log("error canceling order", data);
        setLoading(false);
        return;
      }

      let objIndex = orders.findIndex((obj) => obj._id === list._id);
      let update = [...orders];
      update[objIndex].status = "Cancelled";
      setOrders(update);
      setLoading(false);
    });
  };

  return (
    <div
      style={{ margin: "50px 0px", padding: 10, backgroundColor: "#D6F6BF" }}
    >
      <div className="cartBox" style={{ backgroundColor: "#F4F4F4" }}>
        <Grid container className="textCenter" spacing={2}>
          <Grid item xs={6} sm={3}>
            <div style={{ fontSize: 14, color: "grey" }}>Order Placed</div>
            <div>
              &#128197; {date} <br />
              &#x1F552; {time}
            </div>
          </Grid>
          <Grid item xs={6} sm={3}>
            <div style={{ fontSize: 14, color: "grey" }}>
              Branch &amp; Order Type
            </div>
            <div>
              {" "}
              {list.branch} - {list.type}
            </div>
          </Grid>
          <Grid item xs={6} sm={3}>
            <div style={{ fontSize: 14, color: "grey" }}>Table</div>
            <div>{list.table ? list.table : "NA"}</div>
          </Grid>
          <Grid item xs={6} sm={3}>
            <div style={{ fontSize: 14, color: "grey" }}>Total</div>
            <div style={{ fontWeight: "bold" }}> &#8377; {list.amount}</div>
          </Grid>
          <Grid item xs={6} sm={3}>
            <div style={{ fontSize: 14, color: "grey" }}>Payment</div>
            <div>{list.payment}</div>
          </Grid>
          <Grid item xs={6} sm={3}>
            <div style={{ fontSize: 14, color: "grey" }}>Instructions</div>
            <div>
              {list.instructions !== "false" ? list.instructions : "NA"}
            </div>
          </Grid>
          <Grid item xs={6} sm={3}>
            <div style={{ fontSize: 14, color: "grey" }}>Status</div>
            <div>{list.status}</div>
          </Grid>
        </Grid>
      </div>
      {list.products.map((item, index) => {
        // let finalItem = { ...item };
        // let productDetail = products.find((x) => x._id === item.product);
        // finalItem.product = productDetail;
        // console.log("yay", finalItem);
        return <OrderItem item={item} key={index.toString()} />;
      })}
      <Grid container>
        <Grid item xs={0} sm={6}></Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          spacing={3}
          style={{ display: "flex" }}
        >
          {!admin && <Grid item xs={6}></Grid>}
          {status !== "Completed" && status !== "Cancelled" && (
            <Grid item xs={6}>
              <AppButton
                top="30%"
                padding="5px 0px"
                loading={loading}
                onClick={() => onCancelOrder()}
              >
                Cancel
              </AppButton>
            </Grid>
          )}
          {admin && status !== "Cancelled" && status !== "Completed" && (
            <Grid item xs={6}>
              <AppButton
                top="30%"
                padding="5px 0px"
                loading={loading2}
                onClick={() => onCompletedOrder()}
              >
                Completed
              </AppButton>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

import { Container, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import cartContext from "../context";
import { getUserOrders } from "../Helper/apicalls";
import Order from "./Order";
import OrderItem from "./OrderItem";

export default function MyOrders() {
  const { user } = useContext(cartContext);

  useEffect(() => {
    console.log(user);

    getUserOrders(user.id, user.token)
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [orders, setOrders] = useState([]);
  return (
    <div
      style={{
        flexGrow: 1,
        margin: 20,
      }}
    >
      <Container maxWidth="md" style={{ backgroundColor: "#F8F8F8" }}>
        <p className="textCenter" style={{ fontSize: 25, maring: "10px 0px" }}>
          My Orders
        </p>
        {orders.map((list) => {
          let date = list.updatedAt.split("T")[0];
          console.log(list);
          return (
            <Order
              amount={list.amount}
              branch={list.branch}
              type={list.type}
              date={date}
              items={list.products}
            />
          );
        })}
      </Container>
    </div>
  );
}

import { Container } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import cartContext from "../context";
import { getUserOrders } from "../Helper/apicalls";
import Order from "./Order";

export default function MyOrders({ setLoading, loading }) {
  const { user } = useContext(cartContext);

  useEffect(() => {
    setLoading(true);
    getUserOrders(user.id, user.token)
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user, setLoading]);
  const [orders, setOrders] = useState([]);
  return (
    <div
      style={{
        margin: 20,
      }}
    >
      <Container
        maxWidth="md"
        style={{ backgroundColor: "#F8F8F8", paddingBlock: 20 }}
      >
        {!loading && (
          <p
            className="textCenter"
            style={{ fontSize: 25, maring: "10px 0px" }}
          >
            My Orders
          </p>
        )}
        {orders.map((list, index) => {
          let date = list.updatedAt.split("T")[0];
          console.log(list);
          return (
            <Order
              key={index.toString()}
              amount={list.amount}
              branch={list.branch}
              type={list.type}
              date={date}
              table={list.table}
              items={list.products}
            />
          );
        })}
      </Container>
    </div>
  );
}

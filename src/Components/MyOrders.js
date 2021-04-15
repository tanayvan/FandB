import { Container } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import cartContext from "../context";
import { getUserOrders } from "../Helper/apicalls";
import AppButton from "./AppButton";
import Order from "./Order";

export default function MyOrders({ setLoading, loading, setLength }) {
  const { user } = useContext(cartContext);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    getUserOrders(user.id, user.token)
      .then((data) => {
        setOrders(data);
        setLength(data.length);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user, setLoading, setLength]);
  const [orders, setOrders] = useState([]);
  return (
    <div
      style={{
        margin: 20,
        flexGrow: 1,
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
        {!loading && orders.length < 1 && (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              className="textCenter"
              style={{ fontSize: 20, maring: "10px 0px" }}
            >
              you dont have any order go and add some
            </p>
            <div
              style={{
                width: "30%",
              }}
            >
              <AppButton onClick={() => history.push("/")}>Menu</AppButton>
            </div>
          </div>
        )}
        {orders
          .slice(0)
          .reverse()
          .map((list, index) => {
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
                payment={list.payment}
                instructions={list.instructions}
              />
            );
          })}
      </Container>
    </div>
  );
}

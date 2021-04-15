import { Container } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import cartContext from "../context";
import { getAdminOrders } from "../Helper/apicalls";
import Order from "./Order";

export default function Adminorders({ loading, setLoading, setLength }) {
  const [orders, setOrders] = useState([]);

  const { user, orderType } = useContext(cartContext);

  useEffect(() => {
    getAdminOrders(user.id, user.token).then((data) => {
      if (data.error) {
        console.log("error getting orders", data);
        return;
      }
      const filtered = data.filter((e) => e.branch === orderType.branch);
      console.log(filtered);
      setLength(filtered.length);
      setOrders(filtered);
      setLoading(false);
    });
  }, [orderType, setLoading, user, setLength]);

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
            Orders Of Branch {orderType.branch}
          </p>
        )}
        {orders.length < 1 && !loading && (
          <p
            className="textCenter"
            style={{ fontSize: 20, maring: "10px 0px" }}
          >
            No Orders
          </p>
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

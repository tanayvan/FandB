import {
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  Modal,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Redirect } from "react-router";
import Color from "../Config/Color";
import cartContext from "../context";
import OrderItem from "./OrderItem";
import { createOrder, API, getAllBranches } from "../Helper/apicalls";
import Table from "./Table";
import tableGrey from "../Config/table.svg";
import tableGreen from "../Config/tableGreen.svg";
import AppButton from "./AppButton";

const isReserved = (table, number) => {
  const value = table.includes(number);
  console.log(value);
  return value;
};
export default function Checkout() {
  const { cart, orderType, user, setCart, cities } = useContext(cartContext);
  const [total, setTotal] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [branchDetails, setBranchDetails] = useState();
  const [tabelBook, setTabelBook] = useState(false);
  const [tabelNo, setTabelNo] = useState(0);
  const [showTables, setShowTables] = useState(false);
  const [instructions, setInstructions] = useState("false");
  const [loading, setLoading] = useState(false);
  const [paymentloading, setPaymentloading] = useState(false);

  const makePayment = (token) => {
    setPaymentloading(true);
    const body = {
      token: token,
      product: cart,
      amount: total,
    };
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
    return fetch(`${API}/order/payment/${user.id}`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        console.log(response);
        const { status } = response;
        console.log(status);
        if (status === 200) {
          await handleCafePayment("Pay with Card");
          setPaymentloading(false);
        } else {
          setPaymentloading(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleCafePayment = async (payment) => {
    let productList = [];
    cart.forEach((cart) => {
      productList.push({
        product: cart.product._id,
        quantity: cart.quantity,
        size: cart.size,
        sugar: cart.sugar,
        milk: cart.milk,
      });
    });
    const body = {
      products: productList,
      amount: total,
      type: orderType.type,
      branch: orderType.branch,
      user: user.id,
      payment: payment,
      table: tabelNo,
      instructions: instructions,
    };

    await createOrder(user.id, user.token, body)
      .then((data) => {
        if (!data.error) {
          localStorage.setItem("updatedCart", JSON.stringify([]));
          setCart([]);
          setIsSuccess(true);

          return;
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    function sum() {
      var total = 0;
      cart.forEach((item) => {
        total =
          total +
          item.product.price *
            item.quantity *
            (item.size === "Full" ? 2 : 1) *
            (item.size === "Kitli" ? 4 : 1);
      });
      return total;
    }
    const total = sum();
    setTotal(total);
  }, [cart]);
  useEffect(() => {
    let city = cities.find((x) => x.name === orderType.city);
    getAllBranches(city._id)
      .then((data) => {
        data.forEach((d) => {
          if (d.name === orderType.branch) {
            setBranchDetails(d);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [orderType, cities]);
  const onTableSelect = (index) => {
    console.log(index + 1);
    setTabelNo(index);
    setShowTables(false);
  };

  if (isSuccess) {
    return <Redirect to="/orderplaced" />;
  }
  return (
    <div style={{ flexGrow: 1, margin: 20 }}>
      {cart.length > 0 && (
        <Container maxWidth="md" style={{ backgroundColor: "#F4F4F4" }}>
          <p className="textCenter" style={{ fontSize: 25 }}>
            Checkout
          </p>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <div className="cartBox">{`Total ${cart.length} Items`}</div>
              {cart.map((item, index) => (
                <OrderItem item={item} index={index} />
              ))}
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="cartBox" style={{ fontSize: 14 }}>
                INSTRUCTIONS
              </div>
              <div className="cartBox">
                <input
                  placeholder="Add Instructions"
                  style={{ border: "none", outline: "none" }}
                  onChange={(event) => {
                    setInstructions(event.target.value);
                  }}
                />
              </div>
              <div
                className="cartBox"
                style={{ margin: "10px 0px 0px 0px ", fontSize: 14 }}
              >
                {`PRICE DETAIL`}
              </div>
              <div className="cartBox">
                {cart && <div style={{ color: "grey" }}>{`${total}`}</div>}
              </div>
              <div
                className="cartBox"
                style={{ margin: "10px 0px 0px 0px ", fontSize: 14 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: Color.green,

                        padding: "0px 10px",
                      }}
                      checked={tabelBook}
                      onChange={(event, value) => {
                        setTabelBook(value);
                        setShowTables(true);
                      }}
                    />
                  }
                  label={<div style={{ fontSize: "normal" }}>BOOK TABEL</div>}
                />
              </div>
              {tabelBook && (
                <div
                  className="cartBox"
                  style={{ color: "grey", cursor: "pointer" }}
                  onClick={() => setShowTables(true)}
                >
                  {tabelNo ? `Table no. : ${tabelNo}` : "Click to book table"}
                </div>
              )}

              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "90%", textAlign: "center" }}>
                    <AppButton
                      padding="5px 0px"
                      top="30%"
                      onClick={async () => {
                        setLoading(true);
                        await handleCafePayment("Pay on Visit");
                        setLoading(false);
                      }}
                      loading={loading}
                    >
                      Pay at cafe
                    </AppButton>
                  </div>
                </div>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "90%" }}>
                    <StripeCheckout
                      stripeKey={process.env.REACT_APP_KEY}
                      token={makePayment}
                      amount={total * 100}
                    >
                      <AppButton
                        padding="5px 0px"
                        top="30%"
                        loading={paymentloading}
                      >
                        Pay with Card
                      </AppButton>
                    </StripeCheckout>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <Modal
            open={showTables}
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
                Select Table to book
              </h3>
              <div
                style={{
                  display: "flex",
                  color: "grey",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBlock: 20,
                }}
              >
                <img
                  src={tableGreen}
                  style={{ width: 20, margin: 5 }}
                  alt="avaiable table"
                />{" "}
                : Available
                <img
                  src={tableGrey}
                  style={{ width: 20, marginLeft: 20, marginRight: 5 }}
                  alt="not avaiable table"
                />{" "}
                : Booked
              </div>
              <Container maxWidth="sm">
                <Grid container spacing={3}>
                  {branchDetails &&
                    [...Array(branchDetails.tables)].map((t, index) => (
                      <Grid item xs={6} sm={4} style={{ padding: 20 }}>
                        <Table
                          reserved={isReserved(
                            branchDetails.reserved_table,
                            index + 1
                          )}
                          admin={false}
                          number={index + 1}
                          onClick={onTableSelect}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Container>
              <div style={{ textAlign: "end", marginRight: 30 }}>
                <IconButton
                  style={{ position: "absolute", top: 30 }}
                  edge="start"
                  // className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setShowTables(false)}
                >
                  <Icon>close</Icon>
                </IconButton>
              </div>
            </div>
          </Modal>
        </Container>
      )}
    </div>
  );
}

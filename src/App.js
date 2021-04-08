import React, { useEffect, useState } from "react";
import cartContext from "./context";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import Signup from "./Pages/SignupPage";
import AddProduct from "./Pages/AddProduct";
import AddCity from "./Pages/AddCity";
import AddBranch from "./Pages/AddBranch";
import AddCategory from "./Pages/AddCategory";
import MyOrdersPage from "./Pages/MyOrdersPage";
import CheckoutPage from "./Pages/CheckoutPage";
import Tables from "./Pages/Tables";

export default function App() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart"))
      ? JSON.parse(localStorage.getItem("cart"))
      : []
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : ""
  );
  const [orderType, setOrderType] = useState(
    JSON.parse(localStorage.getItem("orderType"))
      ? JSON.parse(localStorage.getItem("orderType"))
      : null
  );
  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  return (
    <cartContext.Provider
      value={{ cart, setCart, orderType, setOrderType, user, setUser }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/addproduct" component={AddProduct} />
          <Route exact path="/addcity" component={AddCity} />
          <Route exact path="/addbranch" component={AddBranch} />
          <Route exact path="/addcategory" component={AddCategory} />
          <Route exact path="/myorders" component={MyOrdersPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/tables" component={Tables} />
        </Switch>
      </BrowserRouter>
    </cartContext.Provider>
  );
}

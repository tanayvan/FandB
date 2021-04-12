import React, { useEffect, useState } from "react";
import cartContext from "./context";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import ResetPassword from "./Pages/ResetPassword";
import {
  getAllProducts,
  getAllCities,
  getAllCategories,
} from "./Helper/apicalls";
import OrderPlaced from "./Pages/OrderPlaced";

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
  const [products, setProducts] = useState();
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
    getAllCities()
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          setCities(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getAllCategories().then((data) => {
      if (!data.error) {
        setCategories(data);
      } else {
        console.log(data.error);
      }
    });
    if (orderType && orderType.branch) {
      getAllProducts().then((data) => {
        if (data.error) {
          console.log(data.error);
        }

        setProducts(data);
      });
    }
  }, [orderType]);

  return (
    <cartContext.Provider
      value={{
        cart,
        setCart,
        orderType,
        setOrderType,
        user,
        setUser,
        products,
        setProducts,
        cities,
        setCities,
        categories,
        setCategories,
      }}
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
          <Route exact path="/resetpassword" component={ResetPassword} />
          <Route exact path="/orderplaced" component={OrderPlaced} />
        </Switch>
      </BrowserRouter>
    </cartContext.Provider>
  );
}

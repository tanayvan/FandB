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
import coffeeLoading from "./Config/coffeeLoading.json";
import {
  getAllProducts,
  getAllCities,
  getAllCategories,
} from "./Helper/apicalls";
import OrderPlaced from "./Pages/OrderPlaced";
import Lottie from "react-lottie";
import OrdersPage from "./Pages/OrdersPage";

export default function App() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("updatedCart"))
      ? JSON.parse(localStorage.getItem("updatedCart"))
      : []
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
      ? JSON.parse(localStorage.getItem("userData"))
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllData = async () => {
      if (!localStorage.getItem("updatedCart")) {
        localStorage.setItem("updatedCart", JSON.stringify([]));
      }

      await getAllCities()
        .then((data) => {
          if (data.error) {
            console.log(data);
          } else {
            setCities(data);
            return data;
          }
        })
        .then((data) => {
          console.log("app", orderType);
          if (data.filter((e) => e.name === orderType.city).length < 1) {
            setOrderType("");
            localStorage.setItem("orderType", JSON.stringify(""));
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await getAllCategories().then((data) => {
        if (!data.error) {
          setCategories(data);
        } else {
          console.log(data.error);
        }
      });
      setLoading(false);
      if (orderType && orderType.branch) {
        await getAllProducts().then((data) => {
          if (data.error) {
            console.log(data.error);
          }

          setProducts(data);
        });
      }
    };

    getAllData();
  }, [orderType]);

  if (loading) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: coffeeLoading,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          width={350}
          height={350}
        />
      </div>
    );
  }

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
          <Route exact path="/orders" component={OrdersPage} />
        </Switch>
      </BrowserRouter>
    </cartContext.Provider>
  );
}

import React, { useContext, useEffect, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemText from "@material-ui/core/ListItemText";
import "./My.css";

import Icon from "@material-ui/core/Icon";
import {
  Avatar,
  Badge,
  Box,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import { Alert, ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Link, useHistory } from "react-router-dom";
import cartContext from "../context";
import { getAllBranches } from "../Helper/apicalls";
import color from "../Config/Color";
import Scrollspy from "react-scrollspy";

export default function Navbar(props) {
  const {
    cart,
    setOrderType,
    orderType,
    user,
    setUser,
    cities,
    setCart,
    categories,
  } = useContext(cartContext);

  const [showSideBar, setShowSideBar] = useState(false);
  const [placeButton, setPlaceButton] = useState(
    orderType ? orderType.city : cities[0] ? cities[0].name : ""
  );
  const [selectValue, setSelectValue] = useState(
    orderType ? orderType.branch : ""
  );
  const [showTopDrawer, setShowTopDrawer] = useState(!orderType);
  const [showError, setShowError] = useState(false);

  const [branch, setBranch] = useState([]);
  const [order, setOrder] = useState(orderType ? orderType.type : "Take Away");
  const history = useHistory();

  useEffect(() => {
    if (cities.length > 0) {
      let city = cities.find((x) => x.name === placeButton);

      getAllBranches(city._id).then((data) => {
        console.log(data);
        if (data.error) {
        } else {
          let branch = [];
          data.forEach((c) => {
            branch.push({
              name: c.name,
              city: c.city.name,
              table: c.tables,
              reserved: c.reserved_table,
            });
          });
          setBranch(branch);
          if (
            orderType &&
            data.filter((e) => e.name === orderType.branch).length < 1
          ) {
            setOrderType("");
            localStorage.setItem("orderType", JSON.stringify(""));
            setShowTopDrawer(true);
          }
        }
      });
    }
  }, [placeButton, cities, setOrderType, orderType]);

  const list = () => (
    <div
      style={{
        width: 250,
        height: "100%",
        display: "flex",
        flexFlow: "column",
      }}
      role="presentation"
      onClick={() => setShowSideBar(false)}
      onKeyDown={() => setShowSideBar(false)}
      className="leftDrawer"
    >
      <List style={{ flexGrow: 1, paddingTop: 0 }} className="leftDrawer">
        <ListItem
          key={"user"}
          style={{
            backgroundColor: "rgb(211,227,206)",
            height: 150,
          }}
        >
          <Avatar style={{ margin: "0px 10px 0px 0px ", padding: 0 }}>
            <Icon style={{ fontSize: 40 }}>account_circle</Icon>
          </Avatar>
          {user && (
            <ListItemText
              id={"Name"}
              primary={user.name}
              secondary={
                <>
                  <span>{user.email}</span>
                  {!user.isEmailVerified && (
                    <span
                      onClick={() =>
                        history.push({
                          pathname: "/signup",
                          state: { email: user.email },
                        })
                      }
                      style={{
                        color: color.green,
                        cursor: "pointer",
                        display: "block",
                      }}
                    >
                      {"\nverify email"}
                    </span>
                  )}
                </>
              }
            />
          )}

          {!user && (
            <span
              onClick={() => history.push("/login")}
              style={{
                color: color.green,
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              login?
            </span>
          )}
          {/* <ListItemSecondaryAction>
            <Checkbox
              edge="end"
              onChange={handleToggle(value)}
              checked={checked.indexOf(value) !== -1}
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItemSecondaryAction> */}
        </ListItem>
        <ListItem button key={"Home"}>
          <ListItemIcon>
            <Icon>home</Icon>
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>

        <ListItem button key={"Cart"} onClick={() => history.push("/cart")}>
          <ListItemIcon>
            <Icon>shopping_cart</Icon>
          </ListItemIcon>
          <ListItemText primary={"Cart"} />
        </ListItem>
        <ListItem
          button
          key={"MyOrder"}
          onClick={() => {
            if (user) {
              history.push("/myorders");
            } else {
              history.push("/login");
            }
          }}
        >
          <ListItemIcon>
            <Icon>assignment_turned_in</Icon>
          </ListItemIcon>
          <ListItemText primary={"My Orders"} />
        </ListItem>
        <ListItem
          button
          key={"Profile"}
          onClick={() => {
            if (user) {
              history.push("/profile");
            } else {
              history.push("/login");
            }
          }}
        >
          <ListItemIcon>
            <Icon>account_circle</Icon>
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>

        {!user && (
          <ListItem button key={"Login"} onClick={() => history.push("/login")}>
            <ListItemIcon>
              <Icon>login</Icon>
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItem>
        )}

        {user && user.role === 1 && (
          <>
            <Divider />
            <ListItem
              button
              key={"Orders"}
              onClick={() => history.push("/orders")}
            >
              <ListItemIcon>
                <Icon>list_alt</Icon>
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItem>
            <ListItem
              button
              key={"AddProduct"}
              onClick={() => history.push("/addproduct")}
            >
              <ListItemIcon>
                <Icon>add_box</Icon>
              </ListItemIcon>
              <ListItemText primary={"Add Product"} />
            </ListItem>
            <ListItem
              button
              key={"Branches"}
              onClick={() => history.push("/addbranch")}
            >
              <ListItemIcon>
                <Icon>store</Icon>
              </ListItemIcon>
              <ListItemText primary={"Branches"} />
            </ListItem>
            <ListItem
              button
              key={"Cities"}
              onClick={() => history.push("/addcity")}
            >
              <ListItemIcon>
                <Icon>location_city</Icon>
              </ListItemIcon>
              <ListItemText primary={"Cities"} />
            </ListItem>
            <ListItem
              button
              key={"Add City"}
              onClick={() => history.push("/addcategory")}
            >
              <ListItemIcon>
                <Icon>category</Icon>
              </ListItemIcon>
              <ListItemText primary={"Categories"} />
            </ListItem>
            <ListItem
              button
              key={"Categories"}
              onClick={() => history.push("/tables")}
            >
              <ListItemIcon>
                <Icon>table_chart</Icon>
              </ListItemIcon>
              <ListItemText primary={"Tables"} />
            </ListItem>
          </>
        )}
      </List>
      {user && (
        <ListItem
          style={{
            // position: "absolute",
            // bottom: 0,
            backgroundColor: "red",
            color: "white",
          }}
          button
          key={"Logout"}
          onClick={() => {
            setUser(null);
            localStorage.setItem("userData", JSON.stringify(""));
          }}
        >
          <ListItemIcon>
            <Icon style={{ color: "white" }}>logout</Icon>
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      )}
      {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const top = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F4F4F4",
        paddingBottom: 100,
      }}
    >
      <p>Select your choice to start placing order</p>

      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={order}
        onChange={(event) => {
          setOrder(event.target.value);
          let temp = { ...orderType };
          temp["type"] = event.target.value;
          if (event.target.value !== "Delivery") {
            localStorage.setItem("orderType", JSON.stringify(temp));
          } else {
            window.location.replace("https://www.zomato.com");
          }
          setOrderType(temp);
        }}
        count={1}
        row
      >
        {["Take Away", "Dine In", "Delivery"].map((text, index) => (
          <FormControlLabel
            key={index.toString()}
            value={text}
            control={<Radio />}
            label={text}
          />
        ))}
      </RadioGroup>
      <Container
        maxWidth="lg"
        style={{
          textAlign: "center",
          marginBlock: 10,
        }}
      >
        <ToggleButtonGroup
          style={{ display: "block" }}
          value={placeButton}
          exclusive
          onChange={(event, value) => {
            if (value !== null) {
              setPlaceButton(value);
            }
          }}
          aria-label="text alignment"
        >
          {cities.map((text, index) => (
            <ToggleButton
              key={text}
              value={text.name}
              aria-label="left aligned"
              style={{
                textTransform: "capitalize",
                padding: "5px 20px",
                borderRadius: 20,
                margin: 5,
                border: "none",
                // margin: 20,
              }}
            >
              {text.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Container>

      <Container maxWidth="xs">
        <FormControl
          variant="outlined"
          style={{ marginBlock: 10, width: "100%" }}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Branch</InputLabel>
          <Select
            // style={{ fontSize: 14 }}
            // native
            // fullWidth
            value={selectValue}
            onChange={(event) => {
              setSelectValue(event.target.value);
              setOrderType({
                city: placeButton,
                branch: event.target.value,
                type: order,
              });
              localStorage.setItem(
                "orderType",
                JSON.stringify({
                  city: placeButton,
                  branch: event.target.value,
                  type: order,
                })
              );
              localStorage.setItem("updatedCart", JSON.stringify([]));
              setCart([]);

              setShowTopDrawer(false);
            }}
            label="Branch"
            // inputProps={{
            //   name: "age",
            //   id: "outlined-age-native-simple",
            // }}
          >
            {branch
              .filter((text) => text.city === placeButton)
              .map((text) => (
                <MenuItem key={text._id} value={text.name}>
                  {text.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Container>
      <IconButton
        style={{ position: "absolute", right: 10, top: 10 }}
        edge="start"
        // className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={() => {
          setShowError(true);
          setShowTopDrawer(false);
        }}
      >
        <Icon>close</Icon>
      </IconButton>
    </div>
  );

  return (
    <>
      {showError && (!orderType || !orderType.branch) && (
        <div
          style={{
            bottom: 0,
            width: "100%",
            zindex: 2,
          }}
        >
          <Alert severity="warning" variant="filled">
            Please select city and branch
          </Alert>
        </div>
      )}

      <div style={{ flexGrow: 1, position: "sticky", top: 0, zIndex: 10 }}>
        <AppBar
          position="sticky"
          style={{
            backgroundColor: "#5E7E47",
            // position: "absolute",
            top: 0,
          }}
        >
          <Toolbar>
            <Box mr={3}>
              <IconButton
                style={{ marginInline: 5 }}
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setShowSideBar(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography variant="h6">F&amp;B</Typography>
            <div style={{ flexGrow: 1, margin: "0px 0px 0px 20px" }}>
              <button
                onClick={() => setShowTopDrawer(true)}
                style={{
                  backgroundColor: "rgba(0,0,0,.2)",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                {/* {orderType ? orderType.type : "Take Away" + "\n add"} */}
                <div style={{ fontSize: 12 }}>
                  {orderType ? orderType.type : "Take Away"}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {orderType ? orderType.branch : ""}
                  <Icon>expand_more</Icon>
                </div>
              </button>
            </div>
            {/* <Link to="/cart" style={{ color: "white" }}> */}
            <IconButton
              style={{ marginInline: 5 }}
              edge="start"
              // className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => history.push("/cart")}
            >
              <Badge badgeContent={cart.length} color="secondary">
                <Icon>shopping_cart</Icon>
              </Badge>
            </IconButton>
            {/* </Link> */}
          </Toolbar>
          <span style={{ display: "flex", backgroundColor: " rgb(75 105 54)" }}>
            <div style={{ margin: "auto", overflow: "auto" }}>
              <Scrollspy
                items={categories.map((a) => a.name.replace(" ", ""))}
                currentClassName="activeCategory"
                style={{
                  display: "flex",
                  backgroundColor: " rgb(75 105 54)",
                  margin: 0,
                  // justifyContent: "center",
                  // position: "-webkit-sticky",
                  width: "fit-content",
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                  overflow: "auto",
                }}
              >
                {categories.map((category) => (
                  <Link
                    style={{
                      padding: 10,
                      textDecoration: "none",
                      color: "white",
                      minWidth: "fit-content",
                    }}
                    href={`#${category.name.replace(" ", "")}`}
                  >
                    {category.name}
                  </Link>
                ))}
              </Scrollspy>
            </div>
          </span>
        </AppBar>
      </div>

      <div>
        <React.Fragment key={"left"}>
          {/* <Button onClick={() => setShowSideBar(true)}>Left</Button> */}
          <Drawer
            style={{
              display: "flex",
              flexFlow: "column",
              height: "100%",
              // position: "fixed",
              top: 30,
            }}
            anchor={"left"}
            open={showSideBar}
            onClose={() => setShowSideBar(false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
        <React.Fragment key={"top"}>
          <Drawer
            anchor="top"
            open={showTopDrawer}
            onClose={() => {
              setShowTopDrawer(false);
              setShowError(true);
            }}
          >
            {top()}
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
}

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

import Icon from "@material-ui/core/Icon";
import {
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
import { useHistory } from "react-router-dom";
import cartContext from "../context";
import { getAllBranches, getAllCities } from "../Helper/apicalls";

export default function Navbar() {
  const { cart, setOrderType, orderType, user, setUser } = useContext(
    cartContext
  );
  useEffect(() => {
    getAllCities()
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          let city = [];
          data.forEach((c) => {
            city.push(c.name);
          });

          setCities(city);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getAllBranches().then((data) => {
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

        console.log(branch);
        setBranch(branch);
      }
    });
  }, []);
  const [showSideBar, setShowSideBar] = useState(false);
  const [placeButton, setPlaceButton] = useState(
    orderType ? orderType.city : "New Delhi"
  );
  const [selectValue, setSelectValue] = useState(
    orderType ? orderType.branch : ""
  );
  const [showTopDrawer, setShowTopDrawer] = useState(!orderType);
  const [showError, setShowError] = useState(false);
  const [cities, setCities] = useState([]);
  const [branch, setBranch] = useState([]);
  const [order, setOrder] = useState(orderType ? orderType.type : "Take Away");
  const history = useHistory();
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
    >
      <List style={{ flexGrow: 1 }}>
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

        {!user && (
          <ListItem button key={"Login"} onClick={() => history.push("/login")}>
            <ListItemIcon>
              <Icon>login</Icon>
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItem>
        )}
        {user && (
          <ListItem
            style={{
              position: "absolute",
              bottom: 0,
              backgroundColor: "red",
              color: "white",
            }}
            button
            key={"Logout"}
            onClick={() => {
              setUser(null);
              localStorage.setItem("user", JSON.stringify(""));
            }}
          >
            <ListItemIcon>
              <Icon style={{ color: "white" }}>logout</Icon>
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        )}

        {user && user.role === 1 && (
          <>
            <Divider />
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
              key={"Add Branch"}
              onClick={() => history.push("/addbranch")}
            >
              <ListItemIcon>
                <Icon>library_add</Icon>
              </ListItemIcon>
              <ListItemText primary={"Add Branch"} />
            </ListItem>
            <ListItem
              button
              key={"Add City"}
              onClick={() => history.push("/addcity")}
            >
              <ListItemIcon>
                <Icon>post_add</Icon>
              </ListItemIcon>
              <ListItemText primary={"Add City"} />
            </ListItem>
            <ListItem
              button
              key={"Add City"}
              onClick={() => history.push("/addcategory")}
            >
              <ListItemIcon>
                <Icon>post_add</Icon>
              </ListItemIcon>
              <ListItemText primary={"Add Category"} />
            </ListItem>
            <ListItem
              button
              key={"Tables"}
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
            setPlaceButton(value);
          }}
          aria-label="text alignment"
        >
          {cities.map((text, index) => (
            <ToggleButton
              key={text}
              value={text}
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
              {text}
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
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#5E7E47" }}>
          <Toolbar>
            <Box mr={3}>
              <IconButton
                style={{ marginInline: 5 }}
                edge="start"
                // className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => setShowSideBar(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography variant="h6">Chayoos</Typography>
            <div style={{ flexGrow: 1, margin: "0px 10px" }}>
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
        </AppBar>
      </div>
      <div>
        <React.Fragment key={"left"}>
          {/* <Button onClick={() => setShowSideBar(true)}>Left</Button> */}
          <Drawer
            style={{ display: "flex", flexFlow: "column", height: "100%" }}
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
      {showError && (!orderType || !orderType.branch) && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Alert severity="warning" variant="filled">
            Please select city and branch
          </Alert>
        </div>
      )}
    </>
  );
}

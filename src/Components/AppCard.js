import {
  Button,
  Card,
  CircularProgress,
  Icon,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { deleteApiCall, AlterProduct } from "../Helper/apicalls";
import color from "../Config/Color";
import "./My.css";
import cartContext from "../context";

export default function AppCard({
  onAddPress,
  isOutOfStock,
  quantity,
  admin,
  product,
  branchId,
  setOutOfStock,
  outOfStock,
}) {
  const { user, products, setProducts } = useContext(cartContext);

  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(null);

  const handleClose = () => {
    setShowMenu(null);
  };

  const changePRoductState = async () => {
    handleClose();
    setLoading(true);
    let type = isOutOfStock ? "PUT" : "Post";

    await AlterProduct(type, branchId, user.id, user.token, {
      product: product._id,
    }).then((data) => {
      if (data.error) {
        console.log("Error making out of stock product ", data);
        setLoading(false);
        return;
      }
      if (isOutOfStock) {
        let update = [...outOfStock];
        update.splice(update.indexOf(product._id), 1);
        setOutOfStock(update);
      } else {
        let update = [...outOfStock];
        update.push(product._id);
        setOutOfStock(update);
      }
      setLoading(false);
    });
  };

  const handleDelete = () => {
    setLoading(true);
    deleteApiCall(`/product/${product._id}/${user.id}`, user.token).then(
      (data) => {
        if (data.error) {
          console.log("Error deleting product", data.error);
          setLoading(false);
          return;
        }
        let update = products.filter(function (obj) {
          return obj._id !== product._id;
        });
        setLoading(false);
        setProducts(update);
      }
    );
  };

  return (
    <Card
      style={{
        maxWidth: "100%",
        width: "-webkit-fill-available",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ opacity: loading || isOutOfStock ? 0.4 : 1 }}>
        <img
          src={product.photo}
          height={250}
          style={{
            flex: 1,
            width: "100%",
            alignSelf: "stretch",
          }}
          widht="100%"
          alt="product"
        />
        <div className="cardDetail">
          <div className="cardTitle">
            {product.name}
            <div className="cardSubTitle">{product.description}</div>
          </div>
          <div>
            <div style={{ textAlign: "center" }}>&#8377; {product.price}</div>
            <Button
              disabled={isOutOfStock}
              style={{
                padding: "5px 10px",
                border: `2px solid ${color.green}`,
                margin: "15px 5px 0px 0px",
                borderRadius: 20,
              }}
              onClick={() => onAddPress()}
            >
              {quantity ? quantity : <Icon>add</Icon>}
            </Button>
          </div>
        </div>
      </div>
      {(loading || isOutOfStock) && (
        <div
          style={{
            position: "absolute",
            right: isOutOfStock && !loading ? "40%" : "45%",
            top: "45%",
          }}
        >
          {loading && (
            <CircularProgress size={35} style={{ color: color.green }} />
          )}
          {isOutOfStock && !loading && (
            <span style={{ fontSize: 18, color: "red", fontWeight: "500" }}>
              Out of stock
            </span>
          )}
        </div>
      )}
      {admin && (
        <>
          <IconButton
            style={{ position: "absolute", right: 5, top: 5 }}
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={(event) => {
              setShowMenu(event.currentTarget);
            }}
          >
            <Icon>more_vert</Icon>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={showMenu}
            keepMounted
            open={Boolean(showMenu)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
            {!isOutOfStock && (
              <MenuItem onClick={changePRoductState}>
                Make out of stock
              </MenuItem>
            )}
            {isOutOfStock && (
              <MenuItem onClick={changePRoductState}>Make available</MenuItem>
            )}
          </Menu>
        </>
      )}
    </Card>
  );
}

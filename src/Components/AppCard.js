import {
  Button,
  Card,
  CircularProgress,
  Icon,
  IconButton,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { deleteApiCall } from "../Helper/apicalls";
import color from "../Config/Color";
import "./My.css";
import cartContext from "../context";

export default function AppCard({
  onAddPress,

  quantity,
  admin,
  product,
}) {
  const { user, products, setProducts } = useContext(cartContext);

  const [loading, setLoading] = useState(false);

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
        setProducts(update);
        setLoading(false);
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
      <div style={{ opacity: loading ? 0.5 : 1 }}>
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
              style={{
                padding: "5px 10px",
                border: "2px solid black",
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
      {loading && (
        <CircularProgress
          size={35}
          style={{
            position: "absolute",
            right: "45%",
            top: "45%",

            color: color.green,
          }}
        />
      )}
      {admin && (
        <IconButton
          style={{ position: "absolute", right: 5, top: 5 }}
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => {
            handleDelete();
          }}
        >
          <Icon>delete</Icon>
        </IconButton>
      )}
    </Card>
  );
}

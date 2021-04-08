import { Button, Card, Icon } from "@material-ui/core";
import React from "react";
import "./My.css";

export default function AppCard({
  onAddPress,
  title,
  photo,
  subtitle,
  price,
  quantity,
}) {
  return (
    <Card style={{ maxWidth: "100%" }}>
      {/* <CardMedia
        style={{ width: "100%" }}
        image="https://images.all-free-download.com/images/graphicthumb/coffee_time_513817.jpg"
      /> */}
      <img
        src={photo}
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
          {title}
          <div className="cardSubTitle">{subtitle}</div>
        </div>
        <div>
          <div style={{ textAlign: "center" }}>&#8377; {price}</div>
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
    </Card>
  );
}

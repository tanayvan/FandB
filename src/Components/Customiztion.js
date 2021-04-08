import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";

export default function Customiztion({ title, options, onChange }) {
  const [choice, setChoice] = useState(options[0].name);

  return (
    <div>
      <div style={{ margin: "10px 30px", fontSize: 20, color: "grey" }}>
        {title}
      </div>
      <Grid container>
        {options.map((text, index) => (
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <Button
              key={index.toString()}
              style={{
                textTransform: "capitalize",
                padding: "5px 20px",
                borderRadius: 5,
                margin: 5,
                border: "none",
                width: "80%",
                backgroundColor: choice == text.name ? "#5E7E47" : "#EDEDED",
                color: choice == text.name ? "white" : "black",

                // margin: 20,
              }}
              onClick={() => {
                setChoice(text.name);
                onChange(text.name);
              }}
            >
              {text.name}
            </Button>
            <div style={{ fontSize: 12, color: "#6d6d6d" }}>
              {text.quantity}
            </div>
          </Grid>
        ))}
      </Grid>
      <hr style={{ backgroundColor: "#DCDCDC", height: 1, borderWidth: 0 }} />
    </div>
  );
}

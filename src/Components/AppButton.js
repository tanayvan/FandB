import { Button, CircularProgress } from "@material-ui/core";
import React from "react";
import Color from "../Config/Color";

export default function AppButton({
  children,
  loading,
  padding,
  top,
  ...otherPerameters
}) {
  return (
    <div style={{ position: "relative" }}>
      <Button
        style={{
          backgroundColor: loading ? "grey" : Color.green,
          opacity: loading ? 0.5 : 1,
          width: "100%",
          margin: "10px 0px",
          color: "white",
          padding: padding ? padding : "18.5px 10px",
        }}
        {...otherPerameters}
      >
        {children}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            right: "47%",
            top: top ? top : "38%",
            color: Color.green,
          }}
        />
      )}
    </div>
  );
}

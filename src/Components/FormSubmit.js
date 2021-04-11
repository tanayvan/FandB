import React from "react";
import { useFormikContext } from "formik";
import { Button, CircularProgress } from "@material-ui/core";
import Color from "../Config/Color";

function FormSubmit({ children, loading, ...otherPerameters }) {
  const { handleSubmit } = useFormikContext();
  return (
    <div style={{ position: "relative" }}>
      <Button
        style={{
          backgroundColor: loading ? "grey" : Color.green,
          opacity: loading ? 0.5 : 1,
          width: "100%",
          margin: "10px 0px",
          color: "white",
          padding: "18.5px 10px",
        }}
        {...otherPerameters}
        onClick={handleSubmit}
      >
        {children}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            right: "47%",
            top: "38%",
            color: Color.green,
          }}
        />
      )}
    </div>
  );
}

export default FormSubmit;

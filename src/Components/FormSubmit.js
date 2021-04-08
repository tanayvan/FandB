import React from "react";
import { useFormikContext } from "formik";
import { Button } from "@material-ui/core";
import Color from "../Config/Color";

function FormSubmit({ children, ...otherPerameters }) {
  const { handleSubmit } = useFormikContext();
  return (
    <Button
      style={{
        backgroundColor: Color.green,
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
  );
}

export default FormSubmit;

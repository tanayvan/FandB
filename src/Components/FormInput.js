import React from "react";
import ErrorText from "./ErrorText";
import { useFormikContext } from "formik";
import { TextField } from "@material-ui/core";

function FormInput({ feildName, ...otherPerameters }) {
  const {
    setFieldTouched,
    setFieldValue,
    touched,
    values,
    errors,
  } = useFormikContext();
  return (
    <>
      <TextField
        style={{ margin: "10px 0px" }}
        onChange={(input) => setFieldValue(feildName, input.target.value)}
        value={values[feildName]}
        onBlur={() => {
          if (values[feildName]) {
            setFieldValue(feildName, values[feildName].trim());
          }
          setFieldTouched(feildName);
        }}
        {...otherPerameters}
      />
      <ErrorText visible={touched[feildName]} error={errors[feildName]} />
    </>
  );
}

export default FormInput;

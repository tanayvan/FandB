import React from "react";
import { useFormikContext } from "formik";
import AppButton from "./AppButton";

function FormSubmit({ children, loading, ...otherPerameters }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton loading={loading} {...otherPerameters} onClick={handleSubmit}>
      {children}
    </AppButton>
  );
}

export default FormSubmit;

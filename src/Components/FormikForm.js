import React from "react";
import { Formik } from "formik";
function FormikForm({ validationSchema, initialValues, onSubmit, children }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default FormikForm;

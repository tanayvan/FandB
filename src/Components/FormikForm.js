import React, { useState } from "react";
import { Formik } from "formik";
import { Alert } from "@material-ui/lab";
function FormikForm({
  validationSchema,
  initialValues,
  onSubmit,
  children,
  successMessage,
}) {
  const [success, setSuccess] = useState(false);

  const showSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values, { resetForm }, showSuccess);
        }}
      >
        {() => <>{children}</>}
      </Formik>
      {success && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            left: 0,
            zIndex: 2,
          }}
        >
          <Alert
            onClose={() => setSuccess(false)}
            severity="success"
            variant="filled"
          >
            {successMessage ? successMessage : "Success"}
          </Alert>
        </div>
      )}
    </>
  );
}

export default FormikForm;

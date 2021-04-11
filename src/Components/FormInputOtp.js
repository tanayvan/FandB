import { useFormikContext } from "formik";
import React from "react";
import OtpInput from "react-otp-input";
import ErrorText from "./ErrorText";

export default function FormInputOtp({
  feildName,
  onChangeMore,
  hasErrored,
  ...otherPerameters
}) {
  const {
    setFieldTouched,
    setFieldValue,
    touched,
    values,
    errors,
  } = useFormikContext();

  return (
    <div>
      <OtpInput
        containerStyle={{
          justifyContent: "center",
        }}
        hasErrored={hasErrored || (touched[feildName] && errors[feildName])}
        onChange={(input) => {
          setFieldValue(feildName, input);
          if (onChangeMore) {
            onChangeMore(input);
          }
        }}
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
    </div>
  );
}

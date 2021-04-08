import { Container } from "@material-ui/core";
import React, { useContext, useState } from "react";
import Color from "../Config/Color";
import FormikForm from "./FormikForm";
import FormInput from "./FormInput";
import * as yup from "yup";
import FormSubmit from "./FormSubmit";
import { login } from "../Helper/apicalls";
import { Redirect, useHistory } from "react-router";
import cartContext from "../context";
import ErrorText from "./ErrorText";

export default function Login() {
  const { setUser } = useContext(cartContext);

  const history = useHistory();

  const Schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  });
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState();
  const handleSubmit = (values) => {
    setError("");
    login(values).then((data) => {
      if (data.error) {
        setError(data.error);
        return;
      }
      console.log(data);
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.token,
          name: data.user.name,
          role: data.user.role,
          id: data.user._id,
        })
      );
      setUser({
        token: data.token,
        name: data.user.name,
        role: data.user.role,
        id: data.user._id,
      });
      setRedirect(true);
    });
  };
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div style={{ flexGrow: 1, margin: "20px 0px" }}>
      <Container
        maxWidth="xs"
        style={{
          textAlign: "center",
          backgroundColor: "#F4F4F4",
          border: "1px solid #e8e8e8",
        }}
      >
        <p style={{ fontSize: 25 }}>Login</p>
        {/* <br /> */}
        <p style={{ fontSize: 14 }}>Login with your mobile no.</p>
        <ErrorText visible={error} error={error} />
        <FormikForm
          initialValues={{ email: "", password: "" }}
          validationSchema={Schema}
          onSubmit={(values) => handleSubmit(values)}
        >
          <FormInput
            feildName="email"
            placeholder="email"
            variant="outlined"
            fullWidth
            label="Email"
          />
          <FormInput
            type="password"
            feildName="password"
            placeholder="Password"
            variant="outlined"
            fullWidth
            label="Password"
          />
          <FormSubmit>Login</FormSubmit>
        </FormikForm>

        <br />
        <p style={{ color: "grey" }}>
          Dont have Account ?{" "}
          <span
            style={{ color: Color.green, cursor: "pointer" }}
            onClick={() => history.push("/signup")}
          >
            Sign Up
          </span>
        </p>
      </Container>
    </div>
  );
}

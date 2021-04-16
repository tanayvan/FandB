import { Container } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import FormikForm from "./FormikForm";
import FormInput from "./FormInput";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import FormSubmit from "./FormSubmit";
import { signup } from "../Helper/apicalls";
import { Redirect, useHistory } from "react-router";
import ErrorText from "./ErrorText";
import { Swiper, SwiperSlide } from "swiper/react";
import FormInputOtp from "./FormInputOtp";
import { resetPassword } from "../Helper/apicalls";
import color from "../Config/Color";
import cartContext from "../context";

export default function Signup() {
  const { user, setUser } = useContext(cartContext);

  const location = useLocation();
  const history = useHistory();

  const Schema = yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  });

  const Schema1 = yup.object().shape({
    otp: yup.string().required().min(6),
  });

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const [email, setEmail] = useState(
    location.state ? location.state.email : ""
  );

  const resendCode = () => {
    setLoading(true);
    setError("");
    resetPassword("/sendcode", { email: email }).then((data) => {
      if (data.error) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (location.state) {
      setLoading(true);
      setError("");
      resetPassword("/sendcode", { email: email }).then((data) => {
        if (data.error) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setLoading(false);
      });
    }
  }, [location.state, email]);

  const handleSubmit = (values) => {
    setLoading(true);
    setError("");
    signup(values).then((data) => {
      // console.log(data);
      if (data.err) {
        setError(data.err);
        setLoading(false);
        return;
      }
      setEmail(values.email);
      setLoading(false);
      swiper.slideNext();
    });
  };
  if (redirect) {
    return <Redirect to="/login" />;
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
        <p style={{ fontSize: 25 }}>Sign Up</p>
        {/* <br /> */}
        <p style={{ fontSize: 14 }}>Sign up with your Email</p>
        <ErrorText visible={error} error={error} />
        <Swiper
          onSwiper={(s) => {
            setSwiper(s);
          }}
          spaceBetween={50}
          slidesPerView={1}
          allowTouchMove={false}
          // allowSlideNext={false}
          allowSlidePrev={false}
          initialSlide={location.state ? 1 : 0}
        >
          <SwiperSlide>
            <FormikForm
              initialValues={{ email: "", password: "", name: "" }}
              validationSchema={Schema}
              onSubmit={(values) => handleSubmit(values)}
            >
              <FormInput
                feildName="name"
                placeholder="Name"
                variant="outlined"
                fullWidth
                label="Name"
              />
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
              <FormSubmit loading={loading}>Next</FormSubmit>
            </FormikForm>
          </SwiperSlide>
          <SwiperSlide style={{ textAlign: "center" }}>
            <p>
              Please check your emails for a message with your code. Your code
              is 6 numbers long
            </p>
            <p style={{ fontSize: 14 }}>we sent code to {email}</p>
            <FormikForm
              initialValues={{
                otp: "",
              }}
              validationSchema={Schema1}
              onSubmit={(values, { resetForm }) => {
                setLoading(true);
                setError("");
                resetPassword("/verify/email", {
                  email: email,
                  email_verification_code: parseInt(values.otp),
                }).then((data) => {
                  if (!data.success) {
                    setError(data.message);
                    setLoading(false);
                    return;
                  }
                  if (location.state) {
                    let update = { ...user };
                    update.isEmailVerified = true;
                    setUser(update);
                    localStorage.setItem("userData", JSON.stringify(update));
                    setLoading(false);
                    history.push("/");
                    return;
                  }
                  setLoading(false);
                  setRedirect(true);
                });
              }}
            >
              <FormInputOtp
                containerStyle={{
                  justifyContent: "center",
                }}
                feildName="otp"
                isInputNum={true}
                hasErrored={error}
                errorStyle={{ border: "1px solid red" }}
                separator={<span style={{ width: 10 }}> </span>}
                numInputs={6}
              />
              <span
                style={{ color: color.green, cursor: "pointer" }}
                onClick={() => {
                  resendCode();
                }}
              >
                Resend code?
              </span>
              <FormSubmit loading={loading}>Submit</FormSubmit>
            </FormikForm>
          </SwiperSlide>
        </Swiper>

        <br />
      </Container>
    </div>
  );
}

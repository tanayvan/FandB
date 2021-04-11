import { Container } from "@material-ui/core";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import * as yup from "yup";

import { useHistory } from "react-router";

import Footer from "../Components/Footer";
import FormikForm from "../Components/FormikForm";
import FormInput from "../Components/FormInput";
import FormSubmit from "../Components/FormSubmit";
import Navbar2 from "../Components/Navbar2";
import FormInputOtp from "../Components/FormInputOtp";
import { resetPassword } from "../Helper/apicalls";
import ErrorText from "../Components/ErrorText";
import color from "../Config/Color";

export default function ResetPassword() {
  const history = useHistory();

  const [swiper, setSwiper] = useState(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const Schema = yup.object().shape({
    email: yup.string().email().required(),
  });

  const Schema2 = yup.object().shape({
    password: yup.string().required().min(8),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const Schema1 = yup.object().shape({
    otp: yup.string().required().min(6),
  });

  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.europosters.eu/image/1300/wall-murals/brick-wall-white-312x219-cm-130g-m2-vlies-non-woven-i39966.jpg")`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        flexFlow: "column",
        height: "100%",
      }}
    >
      <Navbar2 />
      <div style={{ flexGrow: 1, margin: "20px 0px" }}>
        <Container
          maxWidth="xs"
          style={{
            textAlign: "center",
            backgroundColor: "#F4F4F4",
            border: "1px solid #e8e8e8",
          }}
        >
          <p style={{ fontSize: 25 }}>Reset Password</p>
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
          >
            <SwiperSlide>
              <FormikForm
                initialValues={{
                  email: "",
                }}
                validationSchema={Schema}
                onSubmit={(values, { resetForm }) => {
                  setLoading(true);
                  setError("");
                  resetPassword("/forgotpassword", values).then((data) => {
                    if (data.error) {
                      setError(data.message);
                      setLoading(false);
                      return;
                    }
                    setLoading(false);
                    swiper.slideNext();
                  });
                }}
              >
                <FormInput
                  feildName="email"
                  placeholder="Email"
                  variant="outlined"
                  fullWidth
                  label="Email"
                  onChangeMore={(value) => setEmail(value)}
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
                  resetPassword("/verify", {
                    email: email,
                    security_code: parseInt(values.otp),
                  }).then((data) => {
                    if (!data.success) {
                      setError(data.message);
                      setLoading(false);
                      return;
                    }
                    setLoading(false);
                    swiper.slideNext();
                  });

                  //   handleSubmit(values, resetForm);
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
                  // value={1233}
                  onChangeMore={(value) => setCode(parseInt(value))}
                  separator={<span style={{ width: 10 }}> </span>}
                  numInputs={6}
                />
                <span
                  style={{ color: color.green, cursor: "pointer" }}
                  onClick={() => {
                    setLoading(true);
                    setError("");
                    resetPassword("/forgotpassword", { email: email }).then(
                      (data) => {
                        if (data.error) {
                          setError(data.message);
                          setLoading(false);
                          return;
                        }
                        setLoading(false);
                      }
                    );
                  }}
                >
                  Resend code?
                </span>
                <FormSubmit loading={loading}>Next</FormSubmit>
              </FormikForm>
            </SwiperSlide>
            <SwiperSlide>
              <FormikForm
                initialValues={{
                  password: "",
                  cpassword: "",
                }}
                validationSchema={Schema2}
                onSubmit={(values, { resetForm }) => {
                  setLoading(true);
                  setError("");
                  resetPassword("/changepassword", {
                    email: email,
                    password: values.password,
                    security_code: code,
                  }).then((data) => {
                    console.log("pass", data);
                    if (data.error) {
                      setError(data.message);
                      setLoading(false);
                      return;
                    }
                    setLoading(false);
                    history.push("/login");
                  });
                }}
              >
                <FormInput
                  type="password"
                  feildName="password"
                  placeholder="New Password"
                  variant="outlined"
                  fullWidth
                  label="New Password"
                />
                <FormInput
                  type="password"
                  feildName="cpassword"
                  placeholder="Confirem New Password"
                  variant="outlined"
                  fullWidth
                  label="Confirm New Password"
                />
                <FormSubmit loading={loading}>Submit</FormSubmit>
              </FormikForm>
            </SwiperSlide>
          </Swiper>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

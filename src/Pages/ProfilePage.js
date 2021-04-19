import {
  Container,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as yup from "yup";
import loadingGif from "../Config/loading.json";
import { UserData, UpdateUserData } from "../Helper/apicalls";

import ErrorText from "../Components/ErrorText";
import Footer from "../Components/Footer";
import FormikForm from "../Components/FormikForm";
import FormInput from "../Components/FormInput";
import FormSubmit from "../Components/FormSubmit";
import Navbar2 from "../Components/Navbar2";
import color from "../Config/Color";
import cartContext from "../context";
import { useHistory } from "react-router";

export default function ProfilePage() {
  const Schema = yup.object().shape({
    name: yup.string().required().min(3),
    phone: yup
      .string()
      .min(10, "Enter valid phone number")
      .max(10, "Enter valid phone number"),
    address: yup.string().min(3),
  });

  const { user } = useContext(cartContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [gender, setGender] = useState("");
  const [changed, setChanged] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    UserData(user.id, user.token).then((data) => {
      if (data.error) {
        console.log("error geting user profile data", data);
        setLoading(false);
        return;
      }
      setGender(data.gender);
      setUserData(data);
      setLoading(false);
    });
  }, [user]);

  const handleSubmit = (values, resetForm, showSuccess) => {
    setLoading(true);
    let temp = { ...values };
    delete temp.phone;
    let data = { gender: gender, phone_number: values.phone, ...temp };
    UpdateUserData("PUT", user.id, user.token, data).then((data) => {
      console.log(data, "profile");
      if (data.error) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setUserData(data);
      setChanged(false);
      setLoading(false);
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.europosters.eu/image/1300/wall-murals/brick-wall-white-312x219-cm-130g-m2-vlies-non-woven-i39966.jpg")`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        flexFlow: "column",
        height: loading && !userData ? "100%" : "auto",
        // backgroundSize: ,
      }}
    >
      <Navbar2 />
      {loading && !userData && (
        <div style={{ flexGrow: 1 }}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: loadingGif,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            width={150}
            height={150}
          />
        </div>
      )}
      {(userData || !loading) && (
        <div style={{ flexGrow: 1, margin: "20px 0px" }}>
          <Container
            maxWidth="xs"
            style={{
              textAlign: "center",
              backgroundColor: "#F4F4F4",
              border: "1px solid #e8e8e8",
            }}
          >
            <Icon
              style={{
                fontSize: 100,
                margin: "20px 0px 10px 0px",
                color: color.green,
              }}
            >
              account_circle
            </Icon>
            <p style={{ fontSize: 25, marginTop: 0 }}>Profile</p>

            <ErrorText visible={error} error={error} />
            <FormikForm
              successMessage="City Addes Successfully"
              initialValues={{
                name: userData.name,
                email: userData.email,
                phone: userData.phone_number === 0 ? "" : userData.phone_number,
                address: userData.address,
              }}
              validationSchema={Schema}
              onSubmit={(values, { resetForm }, showSuccess) => {
                if (!values.phone) {
                  values.phone = 0;
                } else {
                  values.phone = parseInt(values.phone);
                }
                handleSubmit(values, resetForm, showSuccess);
              }}
            >
              <FormInput
                feildName="name"
                placeholder="Name"
                variant="outlined"
                fullWidth
                label="Name"
                onChangeMore={() => setChanged(true)}
                required
              />
              <FormControl
                variant="outlined"
                style={{ marginBlock: 10, width: "100%", textAlign: "left" }}
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Gender
                </InputLabel>
                <Select
                  value={gender}
                  onChange={(event) => {
                    setError("");
                    setGender(event.target.value);
                    setChanged(true);
                  }}
                  label="Gender"
                  placeholder="Gender"
                >
                  <MenuItem value={" "}> {`  `}</MenuItem>
                  {["Male", "Female"].map((text, index) => (
                    <MenuItem key={index.toString()} value={text}>
                      {text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormInput
                feildName="email"
                placeholder="Email"
                variant="outlined"
                fullWidth
                label="Email"
                onChangeMore={() => setChanged(true)}
                disabled
              />
              {!user.isEmailVerified && (
                <span
                  onClick={() =>
                    history.push({
                      pathname: "/signup",
                      state: { email: user.email },
                    })
                  }
                  style={{
                    color: color.green,
                    cursor: "pointer",
                    display: "block",
                    textAlign: "right",
                  }}
                >
                  verify email
                </span>
              )}
              <FormInput
                type="number"
                feildName="phone"
                placeholder="Phone"
                variant="outlined"
                fullWidth
                label="Phone"
                onChangeMore={() => setChanged(true)}
              />
              <FormInput
                feildName="address"
                placeholder="Address"
                variant="outlined"
                fullWidth
                label="Address"
                onChangeMore={() => setChanged(true)}
                multiline
              />
              {changed && <FormSubmit loading={loading}>save</FormSubmit>}
            </FormikForm>
          </Container>
        </div>
      )}
      <Footer />
    </div>
  );
}

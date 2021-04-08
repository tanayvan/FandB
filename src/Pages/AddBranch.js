import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../Components/Footer";
import FormikForm from "../Components/FormikForm";
import FormInput from "../Components/FormInput";
import FormSubmit from "../Components/FormSubmit";
import Navbar2 from "../Components/Navbar2";
import * as yup from "yup";
import ErrorText from "../Components/ErrorText";
import { getAllCities, postABranch } from "../Helper/apicalls";
import cartContext from "../context";
import NotAdmin from "../Components/NotAdmin";

export default function AddBranch() {
  const Schema = yup.object().shape({
    branch: yup.string().required().min(3),
    tables: yup.number().required(),
  });
  useEffect(() => {
    getAllCities().then((data) => {
      if (!data.error) {
        let city = [];
        data.map((data) => {
          city.push({ id: data._id, name: data.name });
        });
        console.log(data);
        setCityList(city);
      }
    });
  }, []);
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(cartContext);

  const handleSubmit = (values, resetForm) => {
    if (!city) {
      setError("Select city in which branch is located");
      return;
    }
    values.city = city;
    const body = {
      name: values.branch,
      city: values.city,
      tables: values.tables,
    };
    postABranch(body, user.id, user.token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          resetForm();
        }
      })
      .catch((err) => console.log(err));
    resetForm();
  };

  if (!user || user.role === 0) {
    return <NotAdmin />;
  }

  return (
    <div
      style={{
        backgroundImage: `url("https://cdn.europosters.eu/image/1300/wall-murals/brick-wall-white-312x219-cm-130g-m2-vlies-non-woven-i39966.jpg")`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        flexFlow: "column",
        height: "100%",
        // backgroundSize: ,
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
          <p style={{ fontSize: 25 }}>Add Product</p>
          {/* <br /> */}
          {/* <p style={{ fontSize: 14 }}>Login with your mobile no.</p> */}
          <ErrorText visible={error} error={error} />
          <FormControl
            variant="outlined"
            style={{ marginBlock: 10, width: "100%", textAlign: "left" }}
          >
            <InputLabel htmlFor="outlined-age-native-simple">City</InputLabel>
            <Select
              value={city}
              onChange={(event) => {
                setError("");
                setCity(event.target.value);
              }}
              label="City"
              placeholder="City"
            >
              {cityList.map((text, index) => (
                <MenuItem key={index.toString()} value={text.id}>
                  {text.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormikForm
            initialValues={{
              branch: "",
              tables: "",
            }}
            validationSchema={Schema}
            onSubmit={(values, { resetForm }) => {
              values.tables = parseInt(values.tables);

              handleSubmit(values, resetForm);
            }}
          >
            <FormInput
              feildName="branch"
              placeholder="Branch"
              variant="outlined"
              fullWidth
              label="Branch"
            />

            <FormInput
              type="number"
              feildName="tables"
              placeholder="Number of tables"
              variant="outlined"
              fullWidth
              label="Number of tables"
            />

            <FormSubmit>Submit</FormSubmit>
          </FormikForm>

          <br />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

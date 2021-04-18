import { Container, Grid, List } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { postACity, deleteApiCall } from "../Helper/apicalls";
import Listitem from "../Components/Listitem";
import * as yup from "yup";

import Footer from "../Components/Footer";
import FormikForm from "../Components/FormikForm";
import FormInput from "../Components/FormInput";
import FormSubmit from "../Components/FormSubmit";
import Navbar2 from "../Components/Navbar2";
import cartContext from "../context";
import ErrorText from "../Components/ErrorText";
import NotAdmin from "../Components/NotAdmin";

export default function AddCity() {
  const Schema = yup.object().shape({
    city: yup.string().required().min(3),
  });
  const { user, cities, setCities, orderType, setOrderType } = useContext(
    cartContext
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (city) => {
    await deleteApiCall(`/city/${city._id}/${user.id}`, user.token).then(
      (data) => {
        if (data.error) {
          console.log("Error deleting product", data.error);

          return;
        }
        console.log(data);
        if (city.name === orderType.city) {
          setOrderType("");
          localStorage.setItem("orderType", JSON.stringify(""));
        }
        let update = cities.filter(function (obj) {
          return obj._id !== city._id;
        });
        setCities(update);
      }
    );
  };

  const handleSubmit = (values, resetForm, showSuccess) => {
    setLoading(true);
    setError("");
    const body = {
      name: values.city,
    };
    postACity(body, user.id, user.token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          resetForm();
          let update = [...cities];
          update.push(data.city);
          setCities(update);
          setLoading(false);
          showSuccess();
        }
      })
      .catch((err) => console.log(err));
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
        height: cities.length > 4 ? "auto" : "100%",
        // backgroundSize: ,
      }}
    >
      <Navbar2 />

      <div style={{ flexGrow: 1, margin: "20px 0px" }}>
        <Container
          maxWidth="md"
          style={{
            textAlign: "center",
            backgroundColor: "#F4F4F4",
            border: "1px solid #e8e8e8",
          }}
        >
          <p style={{ fontSize: 25 }}>Cities</p>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <span style={{ color: "grey", fontSize: 14 }}>
                Note : Deleting city will delete all branches of that city
              </span>
              <List
                dense={true}
                style={{ backgroundColor: "white", borderRadius: 5 }}
              >
                {cities.lenth === 0 && <div>NA</div>}
                {cities.map((city, index) => (
                  <Listitem
                    key={index.toString()}
                    text={city.name}
                    icon="location_city"
                    onClick={() => handleDelete(city)}
                  />
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ErrorText visible={error} error={error} />
              <FormikForm
                successMessage="City Addes Successfully"
                initialValues={{
                  city: "",
                }}
                validationSchema={Schema}
                onSubmit={(values, { resetForm }, showSuccess) => {
                  handleSubmit(values, resetForm, showSuccess);
                }}
              >
                <FormInput
                  feildName="city"
                  placeholder="City name"
                  variant="outlined"
                  fullWidth
                  label="City"
                />

                <FormSubmit loading={loading}>Add City</FormSubmit>
              </FormikForm>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

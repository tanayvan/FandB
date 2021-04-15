import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  List,
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
import { getAllBranches, postABranch, deleteApiCall } from "../Helper/apicalls";
import cartContext from "../context";
import NotAdmin from "../Components/NotAdmin";
import Listitem from "../Components/Listitem";

export default function AddBranch() {
  const Schema = yup.object().shape({
    branch: yup.string().required().min(3),
    tables: yup.number().required(),
  });

  const { user, cities, orderType, setOrderType } = useContext(cartContext);
  const [city, setCity] = useState(cities[0] ? cities[0]._id : "");
  const [branches, setBranches] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city) {
      getAllBranches(city).then((data) => {
        if (data.error) {
        } else {
          setBranches(data);
        }
      });
    }
  }, [city]);

  const handleSubmit = (values, resetForm, showSuccess) => {
    setLoading(true);
    if (!city) {
      setError("Select city in which branch is located");
      setLoading(false);
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
          setLoading(false);
        } else {
          resetForm();
          let b = [...branches];
          b.push(data.branch);
          setBranches(b);
          setLoading(false);
          showSuccess();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (branch) => {
    await deleteApiCall(`/branch/${branch._id}/${user.id}`, user.token).then(
      (data) => {
        if (data.error) {
          console.log("Error deleting product", data.error);

          return;
        }
        if (branch.name === orderType.branch) {
          setOrderType("");
          localStorage.setItem("orderType", JSON.stringify(""));
        }
        let update = branches.filter(function (obj) {
          return obj._id !== branch._id;
        });
        setBranches(update);
      }
    );
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
          maxWidth="md"
          style={{
            textAlign: "center",
            backgroundColor: "#F4F4F4",
            border: "1px solid #e8e8e8",
          }}
        >
          <p style={{ fontSize: 25 }}>Add Product</p>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <List
                dense={true}
                style={{ backgroundColor: "white", borderRadius: 5 }}
              >
                {branches.length === 0 && <div>NA</div>}
                {branches.map((branch, index) => (
                  <Listitem
                    key={index.toString()}
                    text={branch.name}
                    icon="store_front"
                    onClick={() => handleDelete(branch)}
                  />
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ErrorText visible={error} error={error} />
              <FormControl
                variant="outlined"
                style={{ marginBlock: 10, width: "100%", textAlign: "left" }}
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  City
                </InputLabel>
                <Select
                  value={city}
                  onChange={(event) => {
                    setError("");
                    setCity(event.target.value);
                  }}
                  label="City"
                  placeholder="City"
                >
                  {cities.map((text, index) => (
                    <MenuItem key={index.toString()} value={text._id}>
                      {text.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormikForm
                successMessage="Branch added successfully"
                initialValues={{
                  branch: "",
                  tables: "",
                }}
                validationSchema={Schema}
                onSubmit={(values, { resetForm }, showSuccess) => {
                  values.tables = parseInt(values.tables);

                  handleSubmit(values, resetForm, showSuccess);
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

                <FormSubmit loading={loading}>Submit</FormSubmit>
              </FormikForm>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

import { Container, Grid, List } from "@material-ui/core";
import React, { useContext, useState } from "react";
import Footer from "../Components/Footer";
import FormikForm from "../Components/FormikForm";
import FormInput from "../Components/FormInput";
import FormSubmit from "../Components/FormSubmit";
import Navbar2 from "../Components/Navbar2";
import * as yup from "yup";
import cartContext from "../context";
import ErrorText from "../Components/ErrorText";
import { postACategory, deleteApiCall } from "../Helper/apicalls";
import NotAdmin from "../Components/NotAdmin";
import Listitem from "../Components/Listitem";

export default function AddCategory() {
  const Schema = yup.object().shape({
    category: yup.string().required().min(3),
  });
  const { user, categories, setCategories } = useContext(cartContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, resetForm, showSuccess) => {
    setLoading(true);
    const body = {
      name: values.category,
    };
    postACategory(body, user.id, user.token).then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        resetForm();
        let update = [...categories];
        update.push(data.category);
        setCategories(update);
        setLoading(false);
        showSuccess();
      }
    });
  };

  const handleDelete = async (id) => {
    await deleteApiCall(`/category/${id}/${user.id}`, user.token).then(
      (data) => {
        if (data.error) {
          console.log("Error deleting product", data.error);

          return;
        }
        console.log(data);
        let update = categories.filter(function (obj) {
          return obj._id !== id;
        });
        setCategories(update);
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
        height: categories.length > 5 ? "auto" : "100%",
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
          <p style={{ fontSize: 25 }}>Add Category</p>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <List
                dense={true}
                style={{ backgroundColor: "white", borderRadius: 5 }}
              >
                {categories.lenth === 0 && <div>NA</div>}
                {categories.map((category, index) => (
                  <Listitem
                    key={index.toString()}
                    text={category.name}
                    icon="category"
                    onClick={() => handleDelete(category._id)}
                  />
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ErrorText visible={error} error={error} />
              <FormikForm
                successMessage="Category Added Successfully"
                initialValues={{
                  category: "",
                }}
                validationSchema={Schema}
                onSubmit={(values, { resetForm }, showSuccess) => {
                  handleSubmit(values, resetForm, showSuccess);
                }}
              >
                <FormInput
                  feildName="category"
                  placeholder="Category"
                  variant="outlined"
                  fullWidth
                  label="category"
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

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
import { getAllCategories, createProduct } from "../Helper/apicalls";
import cartContext from "../context";
import NotAdmin from "../Components/NotAdmin";

export default function AddProduct() {
  const Schema = yup.object().shape({
    title: yup.string().required().min(3),
    subtitle: yup.string().required().min(3),
    price: yup.number().required(),
    stock: yup.number().required(),
  });

  const handleSubmit = (values, resetForm) => {
    const formdata = new FormData();
    formdata.append("name", values.title);
    formdata.append("description", values.subtitle);
    formdata.append("price", values.price);
    formdata.append("stock", values.stock);
    formdata.append("category", category);
    formdata.append("photo", photo);
    createProduct(user.id, user.token, formdata).then((data) => {
      if (data.error) {
        setError(data.error);
        return;
      }
      console.log(data);
    });
    // resetForm();
  };
  useEffect(() => {
    getAllCategories().then((data) => {
      if (!data.error) {
        setCategoryList(data);
      } else {
        console.log(data.error);
      }
    });
  }, []);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState({});
  const [error, setError] = useState("");
  const { user } = useContext(cartContext);
  const [categoryList, setCategoryList] = useState([]);

  if (!user || user.role == 0) {
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

          <FormikForm
            initialValues={{
              title: "",
              subtitle: "",
              price: "",

              stock: "",
            }}
            validationSchema={Schema}
            onSubmit={(values, { resetForm }) => {
              values.stock = parseInt(values.stock);
              values.price = parseInt(values.price);
              handleSubmit(values, resetForm);
            }}
          >
            <FormInput
              feildName="title"
              placeholder="Title"
              variant="outlined"
              fullWidth
              label="Title"
            />
            <FormInput
              // type="password"
              feildName="subtitle"
              placeholder="Sub Title"
              variant="outlined"
              fullWidth
              label="SubTitle"
            />
            <FormInput
              type="number"
              feildName="price"
              placeholder="Price"
              variant="outlined"
              fullWidth
              label="Price"
            />
            <FormInput
              type="file"
              // placeholder="Price"
              variant="outlined"
              fullWidth
              label="Photo"
              accept="image"
              onChange={(event) => {
                setPhoto(event.target.files[0]);
              }}
            />
            <FormInput
              type="number"
              feildName="stock"
              placeholder="Stock"
              variant="outlined"
              fullWidth
              label="Stock"
            />
            <FormControl
              variant="outlined"
              style={{ marginBlock: 10, width: "100%", textAlign: "left" }}
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Category
              </InputLabel>
              <Select
                value={category}
                feildName="category"
                onChange={(event) => {
                  setError("");
                  setCategory(event.target.value);
                }}
                label="Category"
                placeholder="Category"
              >
                {categoryList.map((text, index) => (
                  <MenuItem key={index.toString()} value={text._id}>
                    {text.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormSubmit>Submit</FormSubmit>
          </FormikForm>

          <br />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

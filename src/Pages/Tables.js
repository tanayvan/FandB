import { Container, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar2 from "../Components/Navbar2";
import NotAdmin from "../Components/NotAdmin";
import Table from "../Components/Table";
import tableGrey from "../Config/table.svg";
import tableGreen from "../Config/tableGreen.svg";
import cartContext from "../context";
import {
  getAllBranches,
  UnReserveATable,
  ReserveATable,
} from "../Helper/apicalls";

export default function Tables() {
  const { orderType, user, cities } = useContext(cartContext);

  const [reservedTables, setReservedTables] = useState([]);

  const [branchDetails, setBranchDetails] = useState();

  useEffect(() => {
    let city = cities.find((x) => x.name === orderType.city);

    getAllBranches(city._id)
      .then((data) => {
        data.forEach((d) => {
          if (d.name === orderType.branch) {
            setBranchDetails(d);
            setReservedTables(d.reserved_table);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [orderType, cities]);

  const handleunReserve = async (tabelNo) => {
    await UnReserveATable(
      user.id,
      user.token,
      { table_no: tabelNo },
      branchDetails._id
    ).then((data) => {
      if (data.error) {
        console.log("error");
        return;
      }
      let temp = [...reservedTables];

      temp.splice(temp.indexOf(tabelNo), 1);
      setReservedTables(temp);
    });
  };
  const handleReserve = async (tabelNo) => {
    await ReserveATable(
      user.id,
      user.token,
      { table_no: tabelNo },
      branchDetails._id
    ).then((data) => {
      if (data.error) {
        console.log("error");
        return;
      }
      let temp = [...reservedTables];
      temp.push(tabelNo);
      setReservedTables(temp);
    });
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
      }}
    >
      <Navbar2 />
      <div style={{ margin: "30px 0px" }}>
        <Container
          maxWidth="md"
          style={{
            textAlign: "center",
            backgroundColor: "#F4F4F4",
            border: "1px solid #e8e8e8",
          }}
        >
          <h3 style={{ fontWeight: "400" }} className="textCenter">
            Tables of branch {orderType.branch}
          </h3>
          <div
            style={{
              display: "flex",
              color: "grey",
              justifyContent: "center",
              alignItems: "center",
              marginBlock: 20,
            }}
          >
            <img
              src={tableGreen}
              style={{ width: 20, margin: 5 }}
              alt="available"
            />{" "}
            : Available
            <img
              src={tableGrey}
              style={{ width: 20, marginLeft: 20, marginRight: 5 }}
              alt="unavailable"
            />{" "}
            : Booked
          </div>
          <Grid container spacing={4}>
            {branchDetails &&
              [...Array(branchDetails.tables)].map((t, index) => (
                <Grid
                  item
                  xs={4}
                  style={{ padding: "5%" }}
                  key={index.toString()}
                >
                  <Table
                    admin={true}
                    reserved={reservedTables.includes(index + 1)}
                    number={index + 1}
                    handleunReserve={(number) => handleunReserve(number)}
                    handleReserve={(number) => handleReserve(number)}
                  />
                </Grid>
              ))}
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

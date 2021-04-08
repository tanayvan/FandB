import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
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
  const { orderType, user } = useContext(cartContext);

  const [reservedTables, setReservedTables] = useState([]);
  const [selected, setSelected] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [branchDetails, setBranchDetails] = useState();

  useEffect(() => {
    getAllBranches()
      .then((data) => {
        console.log(orderType);
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
  }, [orderType]);

  const handleClick = () => {
    if (reservedTables.includes(selected)) {
      handleunReserve();
    } else {
      handleReserve();
    }
  };

  const handleunReserve = () => {
    UnReserveATable(
      user.id,
      user.token,
      { table_no: selected },
      branchDetails._id
    ).then((data) => {
      if (data.error) {
        console.log("error");
        return;
      }
      let temp = [...reservedTables];
      console.log("before", temp);
      temp.splice(temp.indexOf(selected), 1);
      setReservedTables(temp);
      console.log("after", temp);
      setShowDialog(false);
    });
  };
  const handleReserve = () => {
    ReserveATable(
      user.id,
      user.token,
      { table_no: selected },
      branchDetails._id
    ).then((data) => {
      if (data.error) {
        console.log("error");
        return;
      }
      let temp = [...reservedTables];
      temp.push(selected);
      setReservedTables(temp);
      setShowDialog(false);
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
                <Grid item xs={4} style={{ padding: "5%" }}>
                  <Table
                    admin={true}
                    reserved={reservedTables.includes(index + 1)}
                    number={index + 1}
                    onClick={(index) => {
                      setSelected(index);
                      setShowDialog(true);
                    }}
                  />
                </Grid>
              ))}
          </Grid>
          {selected && (
            <Dialog open={showDialog}>
              <DialogTitle id="alert-dialog-title">
                {"Are you sure?"}
              </DialogTitle>
              <DialogContent>
                you are{" "}
                {reservedTables.includes(selected)
                  ? "making available"
                  : "reserving"}{" "}
                table number {selected}.
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setShowDialog(false);
                  }}
                  color="primary"
                >
                  NO
                </Button>
                <Button onClick={() => handleClick()} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

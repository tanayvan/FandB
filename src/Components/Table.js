import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";
import color from "../Config/Color";
import tableGrey from "../Config/table.svg";
import tableGreen from "../Config/tableGreen.svg";

export default function Table({
  reserved,
  onClick,
  number,
  admin,
  handleReserve,
  handleunReserve,
}) {
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <div
        onClick={async () => {
          if (!reserved || admin) {
            if (admin) {
              console.log("hhh");
              setShowDialog(true);
            } else {
              await onClick(number);
            }
          }
        }}
        style={{
          position: "relative",
          cursor: !reserved || admin ? "pointer" : "not-allowed",
        }}
      >
        <div
          style={{
            position: "absolute",
            textAlign: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "white",
              position: "absolute",
              bottom: "45%",
              left: "50%",
            }}
          >
            {number}
          </div>
          {loading && (
            <CircularProgress
              size={24}
              style={{
                position: "absolute",
                right: "45%",
                top: "45%",

                color: color.green,
              }}
            />
          )}
        </div>
        <img
          style={{ opacity: loading ? 0.5 : 1 }}
          src={reserved ? tableGrey : tableGreen}
          alt="table"
        />
      </div>
      {admin && (
        <Dialog open={showDialog}>
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            you are {reserved ? "making available" : "reserving"} table number{" "}
            {number}.
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
            <Button
              onClick={async () => {
                setLoading(true);
                setShowDialog(false);
                if (reserved) {
                  await handleunReserve(number);
                  setLoading(false);
                } else {
                  await handleReserve(number);
                  setLoading(false);
                }
              }}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

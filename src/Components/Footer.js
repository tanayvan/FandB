import { Container, Grid, Icon, IconButton } from "@material-ui/core";
import React from "react";
import { Twitter, Instagram } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Container maxWidth="md">
        <Grid container spacing={3} style={{ paddingBlock: 20 }}>
          <Grid item xs={12} sm={6}>
            <p>
              <Link to="/about">About Us</Link>
            </p>
            <p>
              <Link to="/">Contact Us</Link>
            </p>
            <Link to="/">Terms &amp; Conditions</Link>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <IconButton
                edge="start"
                // className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => console.log("Cart")}
              >
                <Icon>facebook</Icon>
              </IconButton>

              <IconButton
                edge="start"
                // className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => console.log("Cart")}
              >
                <Instagram />
              </IconButton>

              <IconButton
                edge="start"
                // className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => console.log("Cart")}
              >
                <Twitter />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Grid
        item
        xs={12}
        style={{ backgroundColor: "#F4F4F4", textAlign: "center", padding: 1 }}
      >
        <p>&copy; All rights reserved</p>
      </Grid>
    </div>
  );
}

import { AppBar, Box, Icon, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar2() {
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#5E7E47" }}>
        <Toolbar>
          <Box mr={3}>
            <Link style={{ marginInline: 5, color: "white" }} to="/">
              <Icon>arrow_back</Icon>
            </Link>
            {/* <MenuIcon /> */}
          </Box>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Chayoos
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

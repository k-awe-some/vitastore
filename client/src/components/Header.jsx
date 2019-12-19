import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles({
  appBar: {
    padding: "0 2rem"
  },
  title: {
    flexGrow: 1
  }
});

const Header = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <NavLink to="/" className={classes.title}>
            <Typography variant="h6">VitaStore</Typography>
          </NavLink>

          <NavLink to="/shop">
            <Button color="inherit">Shop</Button>
          </NavLink>

          <NavLink to="/about">
            <Button color="inherit">About Us</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

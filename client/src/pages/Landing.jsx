import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import landing from "../assets/landing.png";

const useStyles = makeStyles({
  landingContainer: {
    display: "flex",
    alignItems: "center",
    margin: "auto",
    height: "100%"
  },
  landingInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: "2rem"
  },
  ctaButtons: {
    marginTop: "2rem"
  },
  primaryButton: {
    backgroundColor: "#18A3DD",
    color: "#fff",
    marginRight: "1rem"
  }
});

const Landing = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.landingContainer}>
      <Grid item xs className={classes.landingInfo}>
        <Typography variant="h5">the only</Typography>
        <Typography style={{ color: "#18A3DD" }} variant="h4">
          supplement store
        </Typography>
        <Typography variant="h5">you ever need</Typography>

        <div className={classes.ctaButtons}>
          <Button variant="contained" className={classes.primaryButton}>
            shop vitamins
          </Button>
          <Button variant="outlined" color="secondary">
            contact
          </Button>
        </div>
      </Grid>
      <Grid item xs={7}>
        <img src={landing} alt="landing" />
      </Grid>
    </Grid>
  );
};

export default Landing;

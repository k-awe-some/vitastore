import React from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./components/Header";
import ChatBot from "./components/ChatBot";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Shop from "./pages/Shop";

const useStyles = makeStyles({
  app: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "95vh"
  },
  content: {
    flexGrow: 1,
    padding: "0 10rem"
  },
  bot: {
    padding: "0 10rem"
  }
});

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Header />
      <div className={classes.content}>
        <Route exact path="/" component={Landing} />
        <Route exact path="/about" component={About} />
        <Route exact path="/shop" component={Shop} />
      </div>
      <div className={classes.bot}>
        <ChatBot />
      </div>
    </div>
  );
};

export default App;

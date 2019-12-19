import React from "react";
import { Route } from "react-router-dom";

import Header from "./components/Header";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Shop from "./pages/Shop";

const App = () => {
  return (
    <div>
      <Header />
      <Route exact path="/" component={Landing} />
      <Route exact path="/about" component={About} />
      <Route exact path="/shop" component={Shop} />
    </div>
  );
};

export default App;

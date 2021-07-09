import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./common/css/main.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./page/home";
import Profile from "./page/profile";
import HouseData from "./context/Filter";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HouseData>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </HouseData>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("housy")
);

reportWebVitals();

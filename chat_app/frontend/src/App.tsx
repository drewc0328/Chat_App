import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import Login from "./Login/Login";
import HomePage from "./HomePage/HomePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;

import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import Login from "./Login/Login";
import HomePage from "./HomePage/HomePage";
import User from "./UserContext";
import "./App.css";

function App() {
  const [user, setUser] = useState<User>();

  const getUserId = (user: User) => {
    console.log("In userId function");
    setUser(user);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login getUserId={getUserId} />
        </Route>
        <Route exact path="/home">
          <HomePage userData={user} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;

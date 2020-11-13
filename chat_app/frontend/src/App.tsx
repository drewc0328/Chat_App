import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import Login from "./Login/Login";
import HomePageContainer from "./HomePage/Container/HomePageContainer";
import RoomModel from "./RoomContext";
import Room from "./Room/Room";
import User from "./UserContext";
import "./App.css";

function App() {
  const [user, setUser] = useState<User>();

  const [currentRoom, setCurrentRoom] = useState<RoomModel>();

  const getUserId = (user: User) => {
    console.log("In userId function");
    setUser(user);
  };

  const getRoom = (room: RoomModel) => {
    console.log("App Room: ", room);
    setCurrentRoom(room);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login getUserId={getUserId} />
        </Route>
        <Route exact path="/home">
          <HomePageContainer userData={user} getRoom={getRoom} />
        </Route>
        <Route exact path="/room">
          <Room user={user} room={currentRoom} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;

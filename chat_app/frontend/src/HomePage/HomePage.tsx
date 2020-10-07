import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./HomePage.css";
import User from "../UserContext";

const HomePage: React.FC<{
  userData: User | undefined;
}> = (props) => {
  const [back, setBack] = useState<boolean>(false);

  // Room name for creating
  const [roomName, setRoomName] = useState<String>("");

  // Room ID for joining
  const [roomId, setRoomId] = useState<String>("");

  useEffect(() => {
    // TODO: Get user so that user's rooms can update
    console.log(props.userData);
  }, []);

  // Creates a room and joins it
  // Adds the user as a member of the room
  // and adds the room into the user
  const createRoomHandler = async () => {
    //Create the room and add user as member
    try {
      const response = await fetch(
        "http://localhost:5000/api/rooms/createRoom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: roomName,
            userId: props?.userData?.id,
          }),
        }
      );
      const responseData = await response.json();

      console.log("Create ResponseData: ", responseData);

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      const joinResponse = await fetch(
        "http://localhost:5000/api/users/createRoom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: props?.userData?.id,
            roomId: responseData.room.id,
            roomName: responseData.room.name,
          }),
        }
      );

      const joinResponseData = await joinResponse.json();

      console.log("Join ResponseData: ", joinResponseData);
    } catch (err) {
      console.log(err.message || "Something went wrong!");
    }

    //Add the room to the user
    try {
    } catch (err) {
      console.log(err.message || "Something went wrong!");
    }
  };

  //
  //const joinRoom = async () => {};

  return (
    <div>
      {console.log("User Data: ", props.userData?.rooms)}
      {back && <Redirect to="/" />}
      <Button onClick={() => setBack(true)}>Back</Button>
      <h3>HomePage</h3>
      <input
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Room Name"
      />
      <Button onClick={createRoomHandler}>Create</Button>
      <ul>
        {props.userData?.rooms.map((room) => {
          return <li key={room.id}>{room.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default HomePage;

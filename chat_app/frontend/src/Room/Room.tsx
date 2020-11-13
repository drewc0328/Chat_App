import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";
import { Redirect } from "react-router";
import { Button } from "react-bootstrap";
import RoomModel from "../RoomContext";
import UserContext from "../UserContext";

const Room: React.FC<{
  user: UserContext | undefined;
  room: RoomModel | undefined;
}> = (props) => {
  const [back, setBack] = useState<boolean>(false);

  const ENDPOINT = "localhost:5000";
  let socket;

  useEffect(() => {
    console.log(props.room);
    console.log(props.user!.name);

    socket = io(ENDPOINT);

    const userName = props.user!.name;
    const roomName = props.room!.name;

    socket.emit(
      "join",
      {
        userName,
        roomName,
      },
      () => {}
    );

    // return () => {
    //   socket.emit("disconnect");
    //   socket.off();
    // };
  }, [ENDPOINT]);

  return (
    <div>
      {back && <Redirect to="/home" />}
      <Button onClick={() => setBack(true)}>Back</Button>
      <h1>{props?.room?.id}</h1>
      <h1>{props?.room?.name}</h1>
    </div>
  );
};

export default Room;

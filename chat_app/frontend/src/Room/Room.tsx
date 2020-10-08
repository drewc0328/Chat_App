import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Button } from "react-bootstrap";
import RoomModel from "../RoomContext";

const Room: React.FC<{
  room: RoomModel | undefined;
}> = (props) => {
  const [back, setBack] = useState<boolean>(false);

  useEffect(() => {
    console.log(props.room);
  }, []);

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

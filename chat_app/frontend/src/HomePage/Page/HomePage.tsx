import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Redirect } from "react-router";
import RoomModel from "../../RoomContext";
import Room from "../../Room/Room";

const HomePage: React.FC<{
  userRooms: RoomModel[] | undefined;
  createRoom: (roomName: string) => void;
  joinRoom: (roomId: string) => void;
  getRoom: (room: RoomModel) => void;
}> = (props) => {
  const [back, setBack] = useState<boolean>(false);

  const [toRoom, setToRoom] = useState<boolean>(false);

  const [roomName, setRoomName] = useState<string>("");

  const [roomId, setRoomId] = useState<string>("");

  const [roomInfo, setRoomInfo] = useState<RoomModel>();

  const roomHandler = (room: RoomModel) => {
    props.getRoom(room);
    setToRoom(true);
  };

  return (
    <div>
      {back && <Redirect to="/" />}
      {toRoom && <Redirect to="/room" />}
      <Button onClick={() => setBack(true)}>Back</Button>
      <h3>HomePage</h3>
      <input
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Room Name"
      />
      <Button onClick={() => props.createRoom(roomName)}>Create</Button>
      <input
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Room Id"
      />
      <Button onClick={() => props.joinRoom(roomId)}>Join</Button>
      <div>
        {props.userRooms?.map((room) => {
          return (
            <Card onClick={roomHandler.bind(null, room)} key={room.id}>
              {room.name}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;

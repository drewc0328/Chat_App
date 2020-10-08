import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { Redirect } from "react-router";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./HomePageContainer.css";
import HomePage from "../Page/HomePage";
import User from "../../UserContext";
import Room from "../../RoomContext";

const HomePageContainer: React.FC<{
  userData: User | undefined;
  getRoom: (room: Room) => void;
}> = (props) => {
  const [userRooms, setUserRooms] = useState<Room[]>();

  const [roomsLoaded, setRoomsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // TODO: Get user so that user's rooms can update
    setUserRooms(props?.userData?.rooms);
    setRoomsLoaded(true);
  }, []);

  // Creates a room and joins it
  // Adds the user as a member of the room
  // and adds the room into the user
  const createRoomHandler = async (roomName: string) => {
    //Create the room and add user as member
    try {
      const createRoomResponse = await fetch(
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
      const createRoomResponseData = await createRoomResponse.json();

      //console.log("Create ResponseData: ", createRoomResponseData);

      if (!createRoomResponse.ok) {
        throw new Error(createRoomResponseData.message);
      }

      const userAddRoomResponse = await fetch(
        "http://localhost:5000/api/users/joinCreatedRoom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: props?.userData?.id,
            roomId: createRoomResponseData.room.id,
            roomName: createRoomResponseData.room.name,
          }),
        }
      );

      const userAddRoomResponseData = await userAddRoomResponse.json();

      // console.log("Create ResponseData: ", userAddRoomResponseData);
      // console.log(
      //   "Create ResponseData Rooms: ",
      //   userAddRoomResponseData.user.rooms
      // );

      setUserRooms(userAddRoomResponseData.user.rooms);
    } catch (err) {
      console.log(err.message || "Something went wrong!");
    }
  };

  const joinRoomHandler = async (roomId: string) => {
    //Add user as member
    try {
      const addMemberResponse = await fetch(
        "http://localhost:5000/api/rooms/addMember",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: props?.userData?.id,
            roomId,
          }),
        }
      );
      const addMemberResponseData = await addMemberResponse.json();

      // console.log("Add Member ResponseData: ", addMemberResponseData);

      if (!addMemberResponse.ok) {
        throw new Error(addMemberResponseData.message);
      }

      const joinRoomResponse = await fetch(
        "http://localhost:5000/api/users/joinRoom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: props?.userData?.id,
            roomId,
          }),
        }
      );

      const joinRoomResponseData = await joinRoomResponse.json();

      // console.log("Join ResponseData: ", joinRoomResponseData);
      // console.log("Join ResponseData Rooms: ", joinRoomResponseData.user.rooms);

      setUserRooms(joinRoomResponseData.user.rooms);
    } catch (err) {
      console.log(err.message || "Something went wrong!");
    }
  };

  if (roomsLoaded) {
    return (
      <HomePage
        userRooms={userRooms}
        createRoom={createRoomHandler}
        joinRoom={joinRoomHandler}
        getRoom={props.getRoom}
      />
    );
  } else {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }
};

export default HomePageContainer;

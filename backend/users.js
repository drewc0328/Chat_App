const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  const user = { id, name, room };
  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => {
    user.id === id;
  });

  if (index !== -1) {
    return users.splice(index, 1)[0];
  } else {
    console.log("User doesn't exist");
  }
};

const getUser = (id) => {
  foundUser = users.find((user) => user.id.trim() == id.trim());
  return { foundUser };
};

const getUsersInRoom = (room) => {
  userList = users.filter((user) => {
    user.room === room;
  });

  return { userList };
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };

const express = require("express");
const server = express();

const PORT = 5200;

server.use("/", (req, res) => {
  res.send("Very cool");
});

server.listen(PORT, () => {
  console.log(`Connected on port: ${PORT}`);
});

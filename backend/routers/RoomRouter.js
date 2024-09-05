const express = require("express");
const Router = express.Router();
const Auth = require("../middleware/AuthMiddleware");
const {
  createRoom,
  getRooms,
  getMessages,
} = require("../controller/RoomController");

Router.post("/create", Auth, createRoom);
Router.get("/getAll", Auth, getRooms);
Router.get("/getone/:roomId", Auth, getMessages);

module.exports = Router;

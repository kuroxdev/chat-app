const express = require("express");
const Router = express.Router();
const { signUp, signIn, getUsers } = require("../controller/AuthController");
const Auth = require("../middleware/AuthMiddleware");

Router.post("/signup", signUp);
Router.post("/signIn", signIn);
Router.get("/users", Auth, getUsers);

module.exports = Router;

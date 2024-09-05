const express = require("express");
const Router = express.Router();
const { createStory, getStories } = require("../controller/StoryController");
const Auth = require("../middleware/AuthMiddleware");

Router.post("/create", Auth, createStory);
Router.get("/get", getStories);

module.exports = Router;

const express = require("express");
const Router = express.Router();
const {
  createPost,
  getPosts,
  likePost,
  dislikePost,
} = require("../controller/PostsController");

Router.post("/create", createPost);
Router.get("/get", getPosts);
Router.post("/like", likePost);
Router.delete("/dislike", dislikePost);

module.exports = Router;

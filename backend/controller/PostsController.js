const Post = require("../model/PostsModel");
const User = require("../model/userModel");
const Like = require("../model/likesModel");
module.exports = {
  createPost: async (req, res) => {
    const { content, imageUrl } = req.body;
    const userId = req.user.id;

    try {
      const post = await Post.create({ content, imageUrl, userId });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: "Error creating post", error });
    }
  },
  getPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({ include: User });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error });
    }
  },
  likePost: async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id;
    try {
      const like = await Like.create({ postId, userId });
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ message: "Error liking post", error });
    }
  },
  dislikePost: async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id;
    try {
      await Like.destroy({ where: { postId, userId } });
      res.status(200).json({ message: "Post disliked" });
    } catch (error) {
      res.status(500).json({ message: "Error disliking post", error });
    }
  },
};

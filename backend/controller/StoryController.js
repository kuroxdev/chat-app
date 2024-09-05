const Story = require("../model/storiesModel");
const User = require("../model/userModel");
const { Op } = require("sequelize");

module.exports = {
  createStory: async (req, res) => {
    console.log("hereeee inside story controller", req.body);
    console.log("hereee inside req.user", req.user);
    const { imageUrl } = req.body;
    const userId = req.user.id;
    try {
      const expirationTime = Date.now() + 43200;

      const story = await Story.create({
        Content: imageUrl,
        UserId: userId,
        expirationTime,
      });

      res.status(201).json(story);
    } catch (error) {
      throw error;
      res.status(500).json({ message: "Error creating story", error });
    }
  },
  getStories: async (req, res) => {
    console.log("hereeee inside getStories controller");
    const currTime = Date.now();
    console.log("currTime", currTime);
    try {
      const stories = await Story.findAll({
        where: {
          expirationTime: { [Op.lte]: currTime },
        },
        include: [{ model: User, attributes: ["id", "username"] }],
        order: [["createdAt", "DESC"]],
      });
      console.log("stories", stories);
      res.status(200).json(stories);
    } catch (error) {
      throw error;
      res.status(500).json({ message: "Error fetching stories", error });
    }
  },
};

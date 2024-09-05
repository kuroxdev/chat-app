const { DataTypes } = require("sequelize");
const connection = require("../config");

const Post = connection.define("Post", {
  Title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Post;

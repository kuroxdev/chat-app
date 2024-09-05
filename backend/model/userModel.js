const { DataTypes } = require("sequelize");
const connection = require("../config");

const User = connection.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Bio: { type: DataTypes.STRING },
  ProfilePicture: { type: DataTypes.STRING },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;

const { DataTypes } = require("sequelize");
const connection = require("../config");

const Story = connection.define("Story", {
  Content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expirationTime: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = Story;

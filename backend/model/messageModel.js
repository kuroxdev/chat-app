const { DataTypes } = require("sequelize");
const connection = require("../config");

const Message = connection.define("Message", {
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Message;

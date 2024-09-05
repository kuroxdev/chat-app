const { DataTypes } = require("sequelize");
const connection = require("../config");

const Room = connection.define("Room", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Room;

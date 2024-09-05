const { DataTypes } = require("sequelize");
const connection = require("../config");

const Like = connection.define("Like", {});

module.exports = Like;

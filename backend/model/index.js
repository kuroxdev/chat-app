const connection = require("../config");
const User = require("../model/userModel");
const Message = require("../model/messageModel");
const Post = require("../model/PostsModel");
const Stories = require("../model/storiesModel");
const Likes = require("../model/likesModel");
const Room = require("../model/RoomModel");

const sync = async () => {
  await connection.sync({ force: true });
  console.log("All models were synchronized successfully.");
};
// user post relation : one to many
User.hasMany(Post, { foreignKey: { allowNull: false } });
Post.belongsTo(User);

// user story relation : one to many
User.hasMany(Stories, { foreignKey: { allowNull: false } });
Stories.belongsTo(User);

// user likes relation : one to many
User.hasMany(Likes, { foreignKey: { allowNull: false } });
Likes.belongsTo(User);

// post likes relation : one to many
Post.hasMany(Likes, { foreignKey: { allowNull: false } });
Likes.belongsTo(Post);

// User-Room relation
User.belongsToMany(Room, { through: "UserRoom", as: "Rooms" });
Room.belongsToMany(User, { through: "UserRoom", as: "Users" });

// Define the sender and receiver relationships
Room.belongsTo(User, { as: "Sender", foreignKey: "senderId" });
Room.belongsTo(User, { as: "Receiver", foreignKey: "receiverId" });

// Message relation
Room.hasMany(Message, { foreignKey: { allowNull: false } });
Message.belongsTo(Room);

User.hasMany(Message, { foreignKey: { allowNull: false } });
Message.belongsTo(User);
// sync();

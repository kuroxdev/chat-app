const Room = require("../model/RoomModel");
const Message = require("../model/messageModel");
const User = require("../model/userModel");
const { Op } = require("sequelize");

module.exports = {
  createRoom: async (req, res) => {
    const senderId = req.user.id;
    const { receiverId } = req.body;
    try {
      const existingRoom = await Room.findOne({
        where: {
          [Op.or]: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
      });

      if (existingRoom) {
        return res.status(200).json(existingRoom);
      }

      const room = await Room.create({ senderId, receiverId });
      res.status(201).json(room);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getRooms: async (req, res) => {
    const userId = req.user.id;
    try {
      const rooms = await Room.findAll({
        where: {
          [Op.or]: [{ senderId: userId }, { receiverId: userId }],
        },
        include: [
          { model: User, as: "Sender", attributes: ["id", "username"] },
          { model: User, as: "Receiver", attributes: ["id", "username"] },
        ],
      });
      res.status(200).json(rooms);
    } catch (error) {
      throw error;
      res.status(500).send(error);
    }
  },
  getMessages: async (req, res) => {
    const roomId = req.params.roomId;
    try {
      const messages = await Message.findAll({
        where: { roomId },
        include: [{ model: User, attributes: ["id", "username"] }],
        order: [["createdAt", "ASC"]],
      });
      res.status(200).json(messages);
    } catch (error) {
      throw error;
      res.status(500).send(error);
    }
  },
};

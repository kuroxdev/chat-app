const express = require("express");
const app = express();
// socket io imports
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const Message = require("./model/messageModel");
const User = require("./model/userModel");

require("dotenv").config();
require("./model");
const AuthRouter = require("./routers/AuthRouter");
const PostsRouter = require("./routers/PostRouter");
const RoomRouter = require("./routers/RoomRouter");
const StoryRouter = require("./routers/StoryRouter");
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("join_private_room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("send_private_message", async ({ roomId, message, userId }) => {
    try {
      const newMessage = await Message.create({
        body: message,
        UserId: userId,
        RoomId: roomId,
      });
      const messageWithUser = await Message.findOne({
        where: { id: newMessage.id },
        include: [{ model: User, attributes: ["id", "username"] }],
      });
      io.to(roomId).emit("private_message", messageWithUser);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

// my Routers
app.use("/auth", AuthRouter);
app.use("/api/posts", PostsRouter);
app.use("/api/room", RoomRouter);
app.use("/api/story", StoryRouter);
///

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

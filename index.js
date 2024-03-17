const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server, Socket } = require("socket.io");
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`user connected:${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with id ${socket.id} joined room:${data}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("server running");
});

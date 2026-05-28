const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = true;
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // Join personal room
    socket.on("join", (userId) => {
      socket.join(userId);
    });

    // Send Message
    socket.on("sendMessage", (data) => {
      io.to(data.receiverId).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  server.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});

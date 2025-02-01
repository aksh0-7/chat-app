import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => res.send("Server is running..."));


app.use(cors({ origin: "http://localhost:5174" }));  // ✅ Allow frontend URL

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",  // ✅ Allow frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("Message received:", data);
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));

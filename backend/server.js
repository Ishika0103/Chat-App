const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const chatRoutes = require("./routes/chatRoutes");

const connectDB = require("./config/db");
const app = express();

app.use(express.json()); //to accept json data in the body
//json format from server->to convert it to js object->to use it in frontend->we use body parser or express.json or express.urlencoded

dotenv.config(); //connectDB should always be below dotenv

connectDB();

app.get("/", (req, res) => {
  res.send("API running suceeessfully");
});

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   const singleChat = chats.find((c) => c._id === req.params.id);        //before making Api,used to direct checking in browser
//   res.send(singleChat);
// });

app.use("/api/user", userRoutes);
app.use("/api/url", chatRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(5000, () =>
  console.log(`Server started on port ${PORT}`.yellow.bold)
);

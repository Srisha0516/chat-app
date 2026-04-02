const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection (YOUR URL)
mongoose
  .connect(
    "mongodb://srishaselvan516_db_user:admin123@ac-x2cxwsy-shard-00-00.kdy8gbu.mongodb.net:27017,ac-x2cxwsy-shard-00-01.kdy8gbu.mongodb.net:27017,ac-x2cxwsy-shard-00-02.kdy8gbu.mongodb.net:27017/chat-app?ssl=true&replicaSet=atlas-23nunn-shard-0&authSource=admin&appName=employee-cluster"
  )
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// ---------------- MODELS ----------------

// User Model
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// Message Model
const MessageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

// ---------------- ROUTES ----------------

// ✅ REGISTER
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Register failed" });
  }
});

// ✅ LOGIN
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) return res.status(400).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// ✅ GET USERS
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ✅ SEND MESSAGE (SAVES TO DB)
app.post("/send", async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;

    if (!sender || !receiver || !text) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const message = new Message({ sender, receiver, text });
    await message.save();

    res.json(message);
  } catch (err) {
    console.log("Send Error:", err);
    res.status(500).json({ error: "Message not saved" });
  }
});

// ✅ GET MESSAGES BETWEEN 2 USERS
app.get("/messages/:user1/:user2", async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.log("Fetch Error:", err);
    res.status(500).json([]);
  }
});

// ---------------- SERVER ----------------

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
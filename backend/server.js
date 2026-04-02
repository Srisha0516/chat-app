import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// 🔍 Debug (optional – remove later)
console.log("MONGO URI:", process.env.MONGO_URI);

// ✅ Home route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ TEST ROUTE (VERY IMPORTANT)
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working 🚀" });
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err.message);
  });

// ✅ Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import cvRoutes from "./routes/cvRoutes"; // ✅ Import this
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/cv", cvRoutes);

mongoose
  .connect(process.env.MONGO_URI || "", {})
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("database name", mongoose.connection.name);
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

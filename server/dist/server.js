"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cvRoutes_1 = __importDefault(require("./routes/cvRoutes")); // ✅ Import this
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/auth", authRoutes_1.default);
app.use("/api/cv", cvRoutes_1.default); // ✅ Mount your CV route here
mongoose_1.default
    .connect(process.env.MONGO_URI || "", {})
    .then(() => {
    console.log("Connected to MongoDB");
    console.log("database name", mongoose_1.default.connection.name);
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
    .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

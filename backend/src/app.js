const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
      cors({
            origin: "http://localhost:3000",
            credentials: true
      })
);

// // Routes
app.use("/api/auth", authRoutes);

module.exports = app;
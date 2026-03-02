const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Proper CORS setup
app.use(
      cors({
            origin: "http://localhost:3000", // frontend URL
            credentials: true
      })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

module.exports = app;
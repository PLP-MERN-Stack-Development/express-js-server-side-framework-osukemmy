const express = require("express");
require("dotenv").config();

const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const productRoutes = require("./routes/products");

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Custom Middlewares
app.use(logger);
app.use(auth);

// Hello World Route
app.get("/", (req, res) => {
  res.send("Hello World from Express API");
});

// Product Routes
app.use("/api/products", productRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

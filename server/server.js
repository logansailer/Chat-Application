require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./src/db");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
// add

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error_code: 500,
    error_title: "Internal Server Error",
    error_message: "An unexpected error occurred",
  });
});


// server 
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);

  // test db connection
  try {
    await db.raw("SELECT 1");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed :(");
    console.error(error.message);
  }
});

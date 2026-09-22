const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { formatError } = require("../utils/errors");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json(
          formatError(
            400,
            "Validation Error",
            "Email and password are required",
          ),
        );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json(formatError(400, "Validation Error", "Invalid email format"));
    }

    const user = await db("users")
      .where("email", email)
      .select("id", "email", "password_hash", "first_name", "last_name")
      .first();

    if (!user) {
      return res
        .status(401)
        .json(
          formatError(401, "Login Failure", "Email or Password was Invalid!"),
        );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json(
          formatError(401, "Login Failure", "Email or Password was Invalid!"),
        );
    }

    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "48h" },
    );

    return res.status(200).json({
      user_id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json(
        formatError(
          500,
          "Internal Server Error",
          "An unexpected error occurred during login",
        ),
      );
  }
});

module.exports = router;

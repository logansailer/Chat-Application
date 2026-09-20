const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");
const { formatError, formatSuccess } = require("../utils/errors");

const router = express.Router();

// request: { email, password, first_name, last_name }
// response: { user_id, email, first_name, last_name } OR error
router.post("/register", async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({
        error_code: 400,
        error_title: "Validation Error",
        error_message:
          "Missing required fields: email, password, first_name, last_name",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json(formatError(400, "Validation Error", "Invalid email format"));
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json(
          formatError(
            400,
            "Validation Error",
            "Password must be at least 6 characters",
          ),
        );
    }

    if (first_name.trim().length === 0 || first_name.length > 30) {
      return res
        .status(400)
        .json(
          formatError(
            400,
            "Validation Error",
            "First name must be between 1 and 30 characters",
          ),
        );
    }

    if (last_name.trim().length === 0 || last_name.length > 30) {
      return res
        .status(400)
        .json(
          formatError(
            400,
            "Validation Error",
            "Last name must be between 1 and 30 characters",
          ),
        );
    }

    const existingUser = await db("users").where("email", email).first();

    if (existingUser) {
      return res
        .status(400)
        .json(
          formatError(
            400,
            "Email already registered",
            "This email is already associated with an existing account",
          ),
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [userId] = await db("users").insert({
      email: email,
      password_hash: hashedPassword,
      first_name: first_name,
      last_name: last_name,
    });

    return res.status(201).json({
      user_id: userId,
      email: email,
      first_name: first_name,
      last_name: last_name,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json(
        formatError(
          500,
          "Internal Server Error",
          "An unexpected error occurred during registration",
        ),
      );
  }
});

module.exports = router;

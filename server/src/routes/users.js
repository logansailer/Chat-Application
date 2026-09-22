const express = require("express");
const db = require("../db");
const { formatError } = require("../utils/errors");

const router = express.Router();

router.get("/list_all_users", async (req, res) => {
  try {
    const { requester_user_id } = req.query;
    const requesterId = Number(requester_user_id);

    if (!Number.isInteger(requesterId) || requesterId <= 0) {
      return res
        .status(400)
        .json(
          formatError(400, "Validation Error", "requester_user_id is required"),
        );
    }

    const users = await db("users")
      .select("id", "email", "first_name", "last_name")
      .whereNot("id", requesterId)
      .orderBy("id", "asc");

    return res.status(200).json({
      users: users.map((usr) => ({
        user_id: usr.id,
        email: usr.email,
        first_name: usr.first_name,
        last_name: usr.last_name,
      })),
    });
  } catch (error) {
    console.error("Get users error:", error);
    return res
      .status(500)
      .json(
        formatError(
          500,
          "Internal Server Error",
          "An unexpected error occurred while fetching users",
        ),
      );
  }
});

module.exports = router;

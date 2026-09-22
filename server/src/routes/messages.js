const express = require("express");
const db = require("../db");
const requireAuth = require("../middleware/getAuth");
const { formatError, formatSuccess } = require("../utils/errors");

const router = express.Router();

router.post("/send_message", requireAuth, async (req, res) => {
  try {
    const { sender_user_id, receiver_user_id, message } = req.body;
    const senderId = Number(sender_user_id);
    const receiverId = Number(receiver_user_id);

    if (
      !Number.isInteger(senderId) ||
      senderId <= 0 ||
      !Number.isInteger(receiverId) ||
      receiverId <= 0 ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return res
        .status(400)
        .json(
          formatError(
            400,
            "Validation Error",
            "sender_user_id, receiver_user_id, and a non-empty message are required",
          ),
        );
    }

    if (message.trim().length > 2000) {
      return res
        .status(400)
        .json(
          formatError(
            400,
            "Validation Error",
            "Message must be 2000 characters or fewer",
          ),
        );
    }

    if (req.user.user_id !== senderId) {
      return res
        .status(403)
        .json(
          formatError(
            403,
            "Forbidden",
            "You can only send messages as yourself",
          ),
        );
    }

    if (senderId === receiverId) {
      return res
        .status(400)
        .json(
          formatError(
            400,
            "Validation Error",
            "You cannot send a message to yourself",
          ),
        );
    }

    const users = await db("users")
      .whereIn("id", [senderId, receiverId])
      .select("id");

    if (users.length !== 2) {
      return res
        .status(404)
        .json(
          formatError(
            404,
            "User Not Found",
            "The sender or receiver does not exist",
          ),
        );
    }

    await db("messages").insert({
      sender_id: senderId,
      receiver_id: receiverId,
      message: message.trim(),
    });

    return res
      .status(200)
      .json(
        formatSuccess(200, "Message Sent", "Message was sent successfully"),
      );
  } catch (error) {
    console.error("Send message error:", error);
    return res
      .status(500)
      .json(
        formatError(
          500,
          "Internal Server Error",
          "An unexpected error occurred while sending the message",
        ),
      );
  }
});

router.get("/view_messages", async (req, res) => {
  try {
    const { user_id_a, user_id_b } = req.query;
    const userA = Number(user_id_a);
    const userB = Number(user_id_b);

    if (
      !Number.isInteger(userA) ||
      userA <= 0 ||
      !Number.isInteger(userB) ||
      userB <= 0
    ) {
      return res
        .status(400)
        .json(
          formatError(
            400,
            "Validation Error",
            "user_id_a and user_id_b are required",
          ),
        );
    }

    const messages = await db("messages")
      .select("id", "sender_id as sender_user_id", "message", "created_at")
      .where(function () {
        this.where("sender_id", userA).andWhere("receiver_id", userB);
      })
      .orWhere(function () {
        this.where("sender_id", userB).andWhere("receiver_id", userA);
      })
      .orderBy("created_at", "asc");

    return res.status(200).json({
      messages: messages.map((msg) => ({
        message_id: msg.id,
        sender_user_id: msg.sender_user_id,
        message: msg.message,
        epoch: msg.created_at,
      })),
    });
  } catch (error) {
    console.error("View message error:", error);
    return res
      .status(500)
      .json(
        formatError(
          500,
          "Internal Server Error",
          "An unexpected error occurred while retrieving messages",
        ),
      );
  }
});

module.exports = router;

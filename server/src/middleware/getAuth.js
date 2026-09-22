const jwt = require("jsonwebtoken");
const { formatError } = require("../utils/errors");

function requireAuth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .json(formatError(401, "Authentication Required", "An authorization token is required"));
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer" || !token) {
    return res
      .status(401)
      .json(formatError(401, "Invalid Authentication", "Use the auth format: Bearer <token>"));
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res
      .status(401)
      .json(formatError(401, "Invalid Authentication", "The token is invalid or expired"));
  }
}

module.exports = requireAuth;

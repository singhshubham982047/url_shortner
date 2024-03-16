import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).send({ message: "Authentication Fail!" });
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedToken;
    next();
  } catch (err) {
    console.log("Error:", err);
    res.status(403).send({ message: "Invalid token" });
  }
});

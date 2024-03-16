import { Router } from "express";
import {
  createShortId,
  deleteUrl,
  getAllUrls,
  getRedirectUrl,
  visitedHistory,
} from "../controller/url.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

export const urlRouter = Router();

urlRouter.post("/create", isAuthenticated, createShortId);
urlRouter.get("/all-urls/:id", isAuthenticated, getAllUrls);
urlRouter.get("/:urlId", isAuthenticated, getRedirectUrl);
urlRouter.get("/analytics/:shortUrl", isAuthenticated, visitedHistory);
urlRouter.delete("/delete/:id", isAuthenticated, deleteUrl);

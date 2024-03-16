import { Url } from "../model/url.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import shortId from "shortid";

const createShortId = asyncHandler(async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: "Url is required" });
  const shortUrl = shortId(8);
  const newUrl = await Url.create({
    urlId: shortUrl,
    redirectUrl: url,
    visitedHistory: [],
    createdBy: req.user.id,
  });
  if (!newUrl) {
    return res.status(500).json({ success: false, message: "Server error" });
  }

  res.status(201).json({ success: true, newUrl });
});

const getRedirectUrl = asyncHandler(async (req, res) => {
  const urlId = req.params.urlId;
  const entry = await Url.findByIdAndUpdate(
    { _id: urlId },
    { $push: { visitedHistory: new Date(Date.now()) } },
    { new: true }
  );

  if (!entry) return res.status(404).json({ message: "No URL found" });

  res.json({ success: true, entry }).status(302);
});

const visitedHistory = asyncHandler(async (req, res) => {
  const shortUrl = req.params.urlId;
  const history = await Url.findOne({ shortUrl });
  if (!history) res.status(404).json({ message: "URL not Found!" });

  res.json({
    success: true,
    totalClick: history.visitedHistory.length,
    analytics: history.visitedHistory,
  });
});

const getAllUrls = asyncHandler(async (req, res) => {
  const user = req.user.id;
  const urls = (await Url.find({ createdBy: user })).reverse();
  if (!urls)
    return res.status(404).json({ message: "No URLs found with this UserID." });
  res.status(200).json({ success: true, urls });
});

const deleteUrl = asyncHandler(async (req, res) => {
  const urlId = req.params.id;

  if (!urlId)
    return res.status(400).json({ success: true, message: "Invalid URL ID" });

  const deleteUrl = await Url.findById(urlId);
  if (!deleteUrl)
    return res
      .status(400)
      .json({ success: false, message: "This URL does not exist " });

  await deleteUrl.deleteOne();

  res.status(201).json({ success: true, message: "deleted" });
});

export { createShortId, getRedirectUrl, visitedHistory, getAllUrls, deleteUrl };

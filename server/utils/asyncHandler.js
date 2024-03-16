export const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    return await requestHandler(req, res, next);
  } catch (error) {
    res.status(400).json({ success: false, message: "Error Occured" });
  }
};

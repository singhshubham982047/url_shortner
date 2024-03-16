import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!(fullname && email && password))
    return res.status(400).json({ message: "All fields are required" });

  const user = await User.findOne({ email });
  if (user)
    res.status(400).json({ message: "User Already Register", success: false });

  const newUser = await User.create({ fullname, email, password });
  if (!newUser) return new Error({ message: "Internal server Error" });
  const token = await newUser.getJwtToken();
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    path: "/",
  };

  res
    .cookie("token", token, options)
    .status(200)
    .json({ success: true, newUser, token });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password))
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({
      success: false,
      message: "User not found please register first",
    });

  const matchPassword = await user.comparePassword(password);
  if (!matchPassword)
    return res
      .status(404)
      .json({ success: false, message: "Invalid email or password" });

  const token = await user.getJwtToken();
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    path: "/",
  };

  res
    .cookie("token", token, options)
    .status(200)
    .json({ success: true, user, token });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(0),
    httpOnly: true,
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export { registerUser, loginUser, logoutUser };

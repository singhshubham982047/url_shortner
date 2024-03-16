import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import ConnectDb from "./db/connect.db.js";
import { userRouter } from "./routes/user.route.js";
import { urlRouter } from "./routes/url.route.js";

dotenv.config({ path: "./.env" });

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/url", urlRouter);

ConnectDb().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("Connected to the database");
    console.log(`Server is running on  port ${process.env.PORT}`);
  });
});

import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB)
      .then(() => console.log("connecting to the database"));
  } catch (error) {
    console.log("Error :", error);
    process.exit(1);
  }
};

export default ConnectDb;

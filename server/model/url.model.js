import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    urlId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitedHistory: [{ timestamps: { type: Number } }],
  },
  { timestamps: true }
);

export const Url = mongoose.model("Url", urlSchema);

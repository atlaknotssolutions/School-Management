const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, default: "Other" },
    time: { type: String },
    image: { type: String },
    date: { type: Date, required: true },
    venue: { type: String },
    audience: [
      {
        type: String,
        enum: ["admin", "teacher", "student", "parent", "all"],
        default: "all",
      },
    ],
    createdBy: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Event", eventSchema);

const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    audience: [{ type: String, enum: ["admin", "teacher", "student", "parent", "all"], default: "all" }],
    postedBy: { type: String },
    attachments: [{ type: String }],
    expiryDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);

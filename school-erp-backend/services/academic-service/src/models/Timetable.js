const mongoose = require("mongoose");

const periodSchema = new mongoose.Schema(
  {
    subject: String,
    teacherId: String,
    teacherName: String,
    startTime: String,
    endTime: String,
  },
  { _id: false }
);

const timetableSchema = new mongoose.Schema(
  {
    class: { type: String, required: true },
    section: { type: String, required: true },
    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      required: true,
    },
    periods: [periodSchema],
  },
  { timestamps: true }
);

timetableSchema.index({ class: 1, section: 1, day: 1 }, { unique: true });

module.exports = mongoose.model("Timetable", timetableSchema);

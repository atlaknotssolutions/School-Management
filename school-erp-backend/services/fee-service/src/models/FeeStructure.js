const mongoose = require("mongoose");

const feeStructureSchema = new mongoose.Schema(
  {
    class: { type: String, required: true },
    session: { type: String, required: true }, // e.g. "2026-27"
    feeType: { type: String, required: true }, // Tuition, Transport, Hostel, Exam, etc.
    amount: { type: Number, required: true },
    frequency: { type: String, enum: ["Monthly", "Quarterly", "Annually", "One-time"], default: "Quarterly" },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeeStructure", feeStructureSchema);

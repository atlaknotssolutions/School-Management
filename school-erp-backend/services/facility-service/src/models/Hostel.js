const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema(
  {
    roomNo: { type: String, required: true },
    block: { type: String, required: true },
    capacity: { type: Number, required: true },
    occupants: [{ type: String }], // studentIds
    warden: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hostel", hostelSchema);

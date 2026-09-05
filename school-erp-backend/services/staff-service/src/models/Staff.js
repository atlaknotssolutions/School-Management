const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    userId: { type: String, default: null },
    name: { type: String, required: true },
    designation: { type: String, required: true }, // Principal, PGT Physics, TGT Maths, etc.
    department: { type: String },
    role: { type: String, enum: ["teacher", "admin-staff", "support"], default: "teacher" },
    subjects: [{ type: String }],
    classesAssigned: [{ class: String, section: String }],
    qualification: { type: String },
    joiningDate: { type: Date, default: Date.now },
    contact: { type: String },
    email: { type: String },
    address: { type: String },
    photoUrl: { type: String },
    salary: { type: Number, default: 0 },
    status: { type: String, enum: ["Active", "Inactive", "Resigned"], default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);

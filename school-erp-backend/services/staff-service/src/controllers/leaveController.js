const Leave = require("../models/Leave");

const applyLeave = async (req, res) => {
  try {
    const staffId = req.user.role === "teacher" ? req.user.refId : req.body.staffId;
    const leave = await Leave.create({ ...req.body, staffId });
    res.status(201).json({ success: true, data: leave });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getLeaves = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role === "teacher") filter.staffId = req.user.refId;
    if (req.query.status) filter.status = req.query.status;
    const leaves = await Leave.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: leaves.length, data: leaves });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status, remarks, approvedBy: req.user.name },
      { new: true }
    );
    if (!leave) return res.status(404).json({ success: false, message: "Leave not found" });
    res.json({ success: true, data: leave });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { applyLeave, getLeaves, updateLeaveStatus };

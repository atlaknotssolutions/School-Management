const Student = require("../models/Student");

const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const { class: cls, section, status, search, page = 1, limit = 20 } = req.query;
    const filter = {};

    // Teachers implicitly scoped to their class via query params from client;
    // Students/parents only ever see their own record(s)
    if (req.user.role === "student") {
      filter._id = req.user.refId;
    } else if (req.user.role === "parent") {
      filter._id = { $in: req.user.linkedStudentIds || [] };
    }

    if (cls) filter.class = cls;
    if (section) filter.section = section;
    if (status) filter.status = status;
    if (search) filter.name = { $regex: search, $options: "i" };

    const students = await Student.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Student.countDocuments(filter);
    res.json({ success: true, count: students.length, total, page: Number(page), data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const bulkStats = async (req, res) => {
  try {
    const total = await Student.countDocuments();
    const byClass = await Student.aggregate([{ $group: { _id: "$class", count: { $sum: 1 } } }]);
    const active = await Student.countDocuments({ status: "Active" });
    res.json({ success: true, data: { total, active, byClass } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createStudent, getStudents, getStudentById, updateStudent, deleteStudent, bulkStats };

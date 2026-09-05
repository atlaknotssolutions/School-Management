const Exam = require("../models/Exam");
const Marks = require("../models/Marks");

const createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json({ success: true, data: exam });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getExams = async (req, res) => {
  try {
    const { class: cls, subject } = req.query;
    const filter = {};
    if (cls) filter.class = cls;
    if (subject) filter.subject = subject;
    const data = await Exam.find(filter).sort({ date: 1 });
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!exam)
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    res.json({ success: true, data: exam });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteExam = async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Exam deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Teacher enters marks for one or more students for a given exam+subject
const enterMarks = async (req, res) => {
  try {
    const { examId, entries } = req.body; // entries: [{ studentId, marksObtained }]
    const exam = await Exam.findById(examId);
    if (!exam)
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });

    const results = [];
    for (const e of entries) {
      const doc = await Marks.findOneAndUpdate(
        { studentId: e.studentId, examId, subject: exam.subject },
        {
          studentId: e.studentId,
          examId,
          examName: exam.examName,
          class: exam.class,
          subject: exam.subject,
          marksObtained: e.marksObtained,
          maxMarks: exam.maxMarks,
        },
        { new: true, upsert: true, runValidators: true },
      );
      results.push(doc);
    }
    res.json({ success: true, count: results.length, data: results });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Report card for a single student across all subjects for an exam (or all exams)
const getReportCard = async (req, res) => {
  try {
    const { studentId, examName } = req.query;
    if (!studentId)
      return res
        .status(400)
        .json({ success: false, message: "studentId is required" });
    const filter = { studentId };
    if (examName) filter.examName = examName;
    const marks = await Marks.find(filter).sort({ subject: 1 });

    const totalObtained = marks.reduce((s, m) => s + m.marksObtained, 0);
    const totalMax = marks.reduce((s, m) => s + m.maxMarks, 0);
    const percentage = totalMax
      ? ((totalObtained / totalMax) * 100).toFixed(2)
      : "0.00";

    res.json({
      success: true,
      data: {
        studentId,
        examName: examName || "All",
        subjects: marks,
        totalObtained,
        totalMax,
        percentage,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createExam,
  getExams,
  updateExam,
  deleteExam,
  enterMarks,
  getReportCard,
};

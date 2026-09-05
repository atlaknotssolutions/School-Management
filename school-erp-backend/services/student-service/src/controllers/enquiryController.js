const AdmissionEnquiry = require("../models/AdmissionEnquiry");

const createEnquiry = async (req, res) => {
  try {
    const enquiry = await AdmissionEnquiry.create(req.body);
    res.status(201).json({ success: true, data: enquiry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getEnquiries = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const data = await AdmissionEnquiry.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateEnquiry = async (req, res) => {
  try {
    const enquiry = await AdmissionEnquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found" });
    res.json({ success: true, data: enquiry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    await AdmissionEnquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Enquiry deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createEnquiry, getEnquiries, updateEnquiry, deleteEnquiry };

const FeeStructure = require("../models/FeeStructure");

const createStructure = async (req, res) => {
  try {
    const structure = await FeeStructure.create(req.body);
    res.status(201).json({ success: true, data: structure });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getStructures = async (req, res) => {
  try {
    const { class: cls, session } = req.query;
    const filter = {};
    if (cls) filter.class = cls;
    if (session) filter.session = session;
    const data = await FeeStructure.find(filter);
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteStructure = async (req, res) => {
  try {
    await FeeStructure.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Fee structure removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createStructure, getStructures, deleteStructure };

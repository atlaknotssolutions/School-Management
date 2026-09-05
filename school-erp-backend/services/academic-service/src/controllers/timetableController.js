const Timetable = require("../models/Timetable");

const upsertTimetable = async (req, res) => {
  try {
    const { class: cls, section, day } = req.body;
    const timetable = await Timetable.findOneAndUpdate(
      { class: cls, section, day },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.status(201).json({ success: true, data: timetable });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getTimetable = async (req, res) => {
  try {
    const { class: cls, section } = req.query;
    const filter = {};
    if (cls) filter.class = cls;
    if (section) filter.section = section;
    const data = await Timetable.find(filter);
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteTimetable = async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Timetable slot removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { upsertTimetable, getTimetable, deleteTimetable };

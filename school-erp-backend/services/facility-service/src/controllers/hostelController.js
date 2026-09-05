const Hostel = require("../models/Hostel");

const createRoom = async (req, res) => {
  try {
    const room = await Hostel.create(req.body);
    res.status(201).json({ success: true, data: room });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getRooms = async (req, res) => {
  try {
    const { studentId } = req.query;
    const filter = studentId ? { occupants: studentId } : {};
    const data = await Hostel.find(filter);
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const allotRoom = async (req, res) => {
  try {
    const { studentId } = req.body;
    const room = await Hostel.findById(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });
    if (room.occupants.length >= room.capacity) {
      return res.status(400).json({ success: false, message: "Room is full" });
    }
    if (!room.occupants.includes(studentId)) room.occupants.push(studentId);
    await room.save();
    res.json({ success: true, data: room });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { createRoom, getRooms, allotRoom };

const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({ name: String, time: String }, { _id: false });

const busRouteSchema = new mongoose.Schema(
  {
    routeNo: { type: String, required: true, unique: true },
    driverName: { type: String },
    driverContact: { type: String },
    vehicleNo: { type: String },
    stops: [stopSchema],
    assignedStudents: [{ type: String }],
    currentLocation: {
      lat: { type: Number },
      lng: { type: Number },
      updatedAt: { type: Date },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BusRoute", busRouteSchema);

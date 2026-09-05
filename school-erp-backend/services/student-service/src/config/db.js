const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/erp_student");
    console.log("[student-service] MongoDB connected");
  } catch (err) {
    console.error("[student-service] MongoDB connection error:", err.message);
    process.exit(1);
  }
};
module.exports = connectDB;

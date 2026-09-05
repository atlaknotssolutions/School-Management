const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/erp_auth";

    await mongoose.connect(mongoURI);

    console.log("[auth-service] MongoDB connected successfully");
  } catch (error) {
    console.error("[auth-service] MongoDB connection failed:", error.message);

    process.exit(1);
  }
};

module.exports = connectDB;

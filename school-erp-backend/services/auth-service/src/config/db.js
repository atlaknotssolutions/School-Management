const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://atlaknotssolutions_db_user:pOokSSkkiGVWknWq@cluster0.kgscxhb.mongodb.net/?appName=Cluster0",
    );
    console.log("[auth-service] MongoDB connected");
  } catch (err) {
    console.error("[auth-service] MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

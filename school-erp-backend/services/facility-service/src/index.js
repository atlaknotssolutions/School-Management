require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const hostelRoutes = require("./routes/hostelRoutes");
const transportRoutes = require("./routes/transportRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

const app = express();
const PORT = process.env.FACILITY_SERVICE_PORT || 5008;

connectDB();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (req, res) => res.json({ success: true, service: "facility-service", status: "UP" }));
app.use("/api/hostel", hostelRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/inventory", inventoryRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => console.log(`Facility Service running on port ${PORT}`));

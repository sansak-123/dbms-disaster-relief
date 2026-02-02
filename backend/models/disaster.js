const mongoose = require("mongoose");

const disasterSchema = new mongoose.Schema({
  type: { type: String, required: true },
  location: { type: String },
  severity: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Disaster || mongoose.model("Disaster", disasterSchema);

const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    skills: [String],
    availability: { type: Boolean, default: true },
    zone: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Volunteer || mongoose.model("Volunteer", volunteerSchema);

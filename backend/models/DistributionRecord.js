const mongoose = require("mongoose");

const distributionSchema = new mongoose.Schema(
  {
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      required: true,
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
    zone: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" },
    quantity_distributed: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.DistributionRecord ||
  mongoose.model("DistributionRecord", distributionSchema);

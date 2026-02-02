const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 }, // aligned with frontend
    unit: { type: String, required: true },
    zone_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
      default: null,
    },
    category: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Resource || mongoose.model("Resource", resourceSchema);

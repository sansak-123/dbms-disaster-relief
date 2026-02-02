const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g., "ADD_VOLUNTEER", "UPDATE_REQUEST"
  collectionName: { type: String, required: true }, // "Volunteers", "Requests", etc.
  recordId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID of affected record
  oldData: { type: Object }, // previous values for updates
  newData: { type: Object }, // new values for add/update
  performedBy: { type: String, default: "Admin" }, // optional
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AuditLog", auditLogSchema);

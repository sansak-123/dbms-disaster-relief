// utils/auditLogger.js
const AuditLog = require("../models/AuditLog");

async function logAction(
  action,
  collectionName,
  recordId,
  oldData = null,
  newData = null,
  performedBy = "Admin"
) {
  try {
    const log = new AuditLog({
      action,
      collectionName,
      recordId,
      oldData,
      newData,
      performedBy,
    });
    await log.save();
  } catch (error) {
    console.error("Error saving audit log:", error);
  }
}

module.exports = logAction;

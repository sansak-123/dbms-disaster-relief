// routes/zoneRoutes.js
const express = require("express");
const router = express.Router();
const Zone = require("../models/Zone");
const AuditLog = require("../models/AuditLog");

// ✅ GET all zones
router.get("/", async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new zone
router.post("/", async (req, res) => {
  try {
    const zone = new Zone(req.body);
    const saved = await zone.save();

    // 🧾 Log the action
    await AuditLog.create({
      action: "ADD_ZONE",
      collectionName: "Zones",
      recordId: saved._id,
      newData: saved,
      performedBy: "Admin", // You can replace with actual user if authentication is added
    });

    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT update zone
router.put("/:id", async (req, res) => {
  try {
    const oldData = await Zone.findById(req.params.id);
    if (!oldData)
      return res.status(404).json({ message: "Zone not found for update" });

    const updated = await Zone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // 🧾 Log the action
    await AuditLog.create({
      action: "UPDATE_ZONE",
      collectionName: "Zones",
      recordId: updated._id,
      oldData,
      newData: updated,
      performedBy: "Admin",
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE zone
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Zone.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Zone not found for deletion" });

    // 🧾 Log the action
    await AuditLog.create({
      action: "DELETE_ZONE",
      collectionName: "Zones",
      recordId: deleted._id,
      oldData: deleted,
      performedBy: "Admin",
    });

    res.json({ message: "Zone deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

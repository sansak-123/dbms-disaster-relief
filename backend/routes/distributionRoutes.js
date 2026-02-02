const express = require("express");
const router = express.Router();
const DistributionRecord = require("../models/DistributionRecord");
const AuditLog = require("../models/AuditLog");

// ✅ GET all distribution records with populated references
router.get("/", async (req, res) => {
  try {
    const records = await DistributionRecord.find()
      .populate({
        path: "request",
        populate: [
          { path: "disaster", select: "type location" },
          { path: "zone", select: "name" },
          { path: "resource", select: "name category" },
        ],
      })
      .populate("volunteer", "name skills")
      .populate("resource", "name category quantity_available")
      .populate("zone", "name description");

    res.json(records);
  } catch (err) {
    console.error("Error fetching distribution records:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST a new distribution record
router.post("/", async (req, res) => {
  try {
    const record = new DistributionRecord({
      request: req.body.request,
      volunteer: req.body.volunteer,
      resource: req.body.resource,
      zone: req.body.zone,
      quantity_distributed: req.body.quantity_distributed,
      date: req.body.date || Date.now(),
    });

    const saved = await record.save();

    await AuditLog.create({
      action: "ADD_DISTRIBUTION",
      collectionName: "DistributionRecords",
      recordId: saved._id,
      newData: saved,
    });

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating distribution record:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT (update) distribution record
router.put("/:id", async (req, res) => {
  try {
    const oldData = await DistributionRecord.findById(req.params.id);
    const updated = await DistributionRecord.findByIdAndUpdate(
      req.params.id,
      {
        request: req.body.request,
        volunteer: req.body.volunteer,
        resource: req.body.resource,
        zone: req.body.zone,
        quantity_distributed: req.body.quantity_distributed,
        date: req.body.date,
      },
      { new: true }
    );

    await AuditLog.create({
      action: "UPDATE_DISTRIBUTION",
      collectionName: "DistributionRecords",
      recordId: updated._id,
      oldData,
      newData: updated,
    });

    res.json(updated);
  } catch (err) {
    console.error("Error updating distribution record:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE distribution record
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await DistributionRecord.findByIdAndDelete(req.params.id);

    await AuditLog.create({
      action: "DELETE_DISTRIBUTION",
      collectionName: "DistributionRecords",
      recordId: deleted._id,
      oldData: deleted,
    });

    res.json({ message: "Distribution record deleted" });
  } catch (err) {
    console.error("Error deleting distribution record:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

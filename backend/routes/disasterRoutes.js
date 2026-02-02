const express = require("express");
const router = express.Router();
const Disaster = require("../models/disaster");
const AuditLog = require("../models/AuditLog");

// GET all disasters
router.get("/", async (req, res) => {
  const disasters = await Disaster.find();
  res.json(disasters);
});

// POST new disaster
router.post("/", async (req, res) => {
  const disaster = new Disaster(req.body);
  const saved = await disaster.save();

  await AuditLog.create({
    action: "ADD_DISASTER",
    collectionName: "Disasters",
    recordId: saved._id,
    newData: saved,
  });

  res.json(saved);
});

// PUT update disaster
router.put("/:id", async (req, res) => {
  const oldData = await Disaster.findById(req.params.id);
  const updated = await Disaster.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  await AuditLog.create({
    action: "UPDATE_DISASTER",
    collectionName: "Disasters",
    recordId: updated._id,
    oldData,
    newData: updated,
  });

  res.json(updated);
});

// DELETE disaster
router.delete("/:id", async (req, res) => {
  const deleted = await Disaster.findByIdAndDelete(req.params.id);

  await AuditLog.create({
    action: "DELETE_DISASTER",
    collectionName: "Disasters",
    recordId: deleted._id,
    oldData: deleted,
  });

  res.json({ message: "Disaster deleted" });
});

module.exports = router;

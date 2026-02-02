const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");
const AuditLog = require("../models/AuditLog");

// ✅ GET all volunteers with zone info
router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find().populate(
      "zone",
      "name description"
    );
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new volunteer
router.post("/", async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    const saved = await volunteer.save();

    await AuditLog.create({
      action: "ADD_VOLUNTEER",
      collectionName: "Volunteers",
      recordId: saved._id,
      newData: saved,
    });

    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT update volunteer
router.put("/:id", async (req, res) => {
  try {
    const oldData = await Volunteer.findById(req.params.id);
    const updated = await Volunteer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    await AuditLog.create({
      action: "UPDATE_VOLUNTEER",
      collectionName: "Volunteers",
      recordId: updated._id,
      oldData,
      newData: updated,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE volunteer
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Volunteer.findByIdAndDelete(req.params.id);

    await AuditLog.create({
      action: "DELETE_VOLUNTEER",
      collectionName: "Volunteers",
      recordId: deleted?._id,
      oldData: deleted,
    });

    res.json({ message: "Volunteer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

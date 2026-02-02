const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");
const AuditLog = require("../models/AuditLog");

// ✅ GET all resources with zone info
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find().populate(
      "zone_id",
      "name region description"
    );
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new resource
router.post("/", async (req, res) => {
  try {
    const resource = new Resource(req.body);
    const saved = await resource.save();

    await logAction(
      "ADD_RESOURCE",
      "Resources",
      newResource._id,
      null,
      req.body
    );

    res.status(201).json(newResource);
  } catch (err) {
    console.error("Error adding resource:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT update resource
router.put("/:id", async (req, res) => {
  try {
    const oldData = await Resource.findById(req.params.id);
    const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    await logAction(
      "UPDATE_RESOURCE",
      "Resources",
      updated._id,
      oldResource,
      updated
    );

    res.json(updated);

    res.json(updated);
  } catch (err) {
    console.error("Error updating resource:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE resource
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id);

    await logAction(
      "DELETE_RESOURCE",
      "Resources",
      req.params.id,
      deleted,
      null
    );

    res.json({ message: "Resource deleted" });

    res.json({ message: "Resource deleted" });
  } catch (err) {
    console.error("Error deleting resource:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

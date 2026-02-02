// routes/request.js
const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const AuditLog = require("../models/AuditLog");

// ✅ GET all requests with populated references
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("disaster", "type location date severity")
      .populate("zone", "name description")
      .populate("resource", "name unit");
    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ error: "Server error while fetching requests" });
  }
});

// ✅ POST - Create new request
router.post("/", async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    const saved = await newRequest.save();

    // Audit log entry
    if (AuditLog) {
      await AuditLog.create({
        action: "ADD_REQUEST",
        collectionName: "Requests",
        recordId: saved._id,
        newData: saved,
      });
    }

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({ error: "Failed to create request" });
  }
});

// ✅ PUT - Update a request by ID
router.put("/:id", async (req, res) => {
  try {
    const oldData = await Request.findById(req.params.id);
    if (!oldData) {
      return res.status(404).json({ error: "Request not found" });
    }

    const updated = await Request.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (AuditLog) {
      await AuditLog.create({
        action: "UPDATE_REQUEST",
        collectionName: "Requests",
        recordId: updated._id,
        oldData,
        newData: updated,
      });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating request:", err);
    res.status(500).json({ error: "Failed to update request" });
  }
});

// ✅ DELETE - Remove a request
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Request.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Request not found" });
    }

    if (AuditLog) {
      await AuditLog.create({
        action: "DELETE_REQUEST",
        collectionName: "Requests",
        recordId: deleted._id,
        oldData: deleted,
      });
    }

    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    console.error("Error deleting request:", err);
    res.status(500).json({ error: "Failed to delete request" });
  }
});

module.exports = router;

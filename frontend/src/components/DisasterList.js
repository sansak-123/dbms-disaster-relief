import React, { useState, useEffect } from "react";
import axios from "axios";

function DisasterList() {
  const [disasters, setDisasters] = useState([]);
  const [newDisaster, setNewDisaster] = useState({
    type: "",
    location: "",
    severity: "",
    date: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const baseURL = "http://localhost:5000/api/disasters";

  // Fetch all disasters
  const fetchDisasters = async () => {
    try {
      const response = await axios.get(baseURL);
      setDisasters(response.data);
    } catch (error) {
      console.error("Error fetching disasters:", error);
    }
  };

  useEffect(() => {
    fetchDisasters();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDisaster({ ...newDisaster, [name]: value });
  };

  // Add new disaster
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(baseURL, newDisaster);
      setNewDisaster({ type: "", location: "", severity: "", date: "" });
      fetchDisasters();
    } catch (error) {
      console.error("Error adding disaster:", error);
    }
  };

  // Delete disaster
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this disaster?"))
      return;
    try {
      await axios.delete(`${baseURL}/${id}`);
      fetchDisasters();
    } catch (error) {
      console.error("Error deleting disaster:", error);
    }
  };

  // Start editing
  const handleEdit = (disaster) => {
    setEditMode(true);
    setEditId(disaster._id);
    setNewDisaster({
      type: disaster.type,
      location: disaster.location,
      severity: disaster.severity,
      date: disaster.date.split("T")[0],
    });
  };

  // Update disaster
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/${editId}`, newDisaster);
      setEditMode(false);
      setEditId(null);
      setNewDisaster({ type: "", location: "", severity: "", date: "" });
      fetchDisasters();
    } catch (error) {
      console.error("Error updating disaster:", error);
    }
  };

  return (
    <div className="p-3">
      <h3 className="mb-3">🌪️ Disaster Management</h3>

      {/* Add / Edit Form */}
      <form
        onSubmit={editMode ? handleUpdate : handleAdd}
        className="mb-4 d-flex flex-wrap gap-2"
      >
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={newDisaster.type}
          onChange={handleChange}
          className="form-control"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newDisaster.location}
          onChange={handleChange}
          className="form-control"
          required
        />
        <input
          type="text"
          name="severity"
          placeholder="Severity"
          value={newDisaster.severity}
          onChange={handleChange}
          className="form-control"
          required
        />
        <input
          type="date"
          name="date"
          value={newDisaster.date}
          onChange={handleChange}
          className="form-control"
          required
        />
        <button type="submit" className="btn btn-primary">
          {editMode ? "Update" : "Add"}
        </button>
        {editMode && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setEditMode(false);
              setNewDisaster({
                type: "",
                location: "",
                severity: "",
                date: "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Disaster Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Type</th>
            <th>Location</th>
            <th>Severity</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {disasters.map((d) => (
            <tr key={d._id}>
              <td>{d.type}</td>
              <td>{d.location}</td>
              <td>{d.severity}</td>
              <td>{new Date(d.date).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(d)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(d._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisasterList;

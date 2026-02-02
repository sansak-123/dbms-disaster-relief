// frontend/src/components/ResourceList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Card } from "react-bootstrap";

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [zones, setZones] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "",
    zone_id: "",
  });
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/resources";
  const ZONE_API = "http://localhost:5000/api/zones";

  useEffect(() => {
    fetchResources();
    fetchZones();
  }, []);

  // Fetch all resources with zone populated
  const fetchResources = async () => {
    try {
      const res = await axios.get(API_URL);
      setResources(res.data);
    } catch (err) {
      console.error("Error fetching resources:", err);
    }
  };

  // Fetch zones for dropdown
  const fetchZones = async () => {
    try {
      const res = await axios.get(ZONE_API);
      setZones(res.data);
    } catch (err) {
      console.error("Error fetching zones:", err);
    }
  };

  // Form input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update resource
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      zone_id: formData.zone_id || null,
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post(API_URL, payload);
      }

      // Reset form and refresh list
      setFormData({ name: "", quantity: "", unit: "", zone_id: "" });
      fetchResources();
    } catch (err) {
      console.error("Error saving resource:", err);
    }
  };

  // Edit existing resource
  const handleEdit = (r) => {
    setEditId(r._id);
    setFormData({
      name: r.name,
      quantity: r.quantity,
      unit: r.unit,
      zone_id: r.zone_id?._id || "",
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditId(null);
    setFormData({ name: "", quantity: "", unit: "", zone_id: "" });
  };

  // Delete resource
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchResources();
      } catch (err) {
        console.error("Error deleting resource:", err);
      }
    }
  };

  return (
    <div className="container my-4">
      <h3 className="mb-3">🏗️ Resource Management</h3>

      <Card className="p-3 mb-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <Form.Group className="mb-2">
            <Form.Label>Resource Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Food Packets"
              required
            />
          </Form.Group>

          {/* Quantity */}
          <Form.Group className="mb-2">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              required
            />
          </Form.Group>

          {/* Unit */}
          <Form.Group className="mb-2">
            <Form.Label>Unit</Form.Label>
            <Form.Control
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="e.g. boxes, liters, kg"
              required
            />
          </Form.Group>

          {/* Zone */}
          <Form.Group className="mb-2">
            <Form.Label>Zone</Form.Label>
            <Form.Select
              name="zone_id"
              value={formData.zone_id}
              onChange={handleChange}
            >
              <option value="">Select Zone</option>
              {zones.map((z) => (
                <option key={z._id} value={z._id}>
                  {z.name} ({z.region})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            {editId ? "Update Resource" : "Add Resource"}
          </Button>

          {editId && (
            <Button variant="secondary" className="ms-2" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </Form>
      </Card>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Zone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.quantity}</td>
              <td>{r.unit}</td>
              <td>{r.zone_id?.name || "N/A"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(r)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(r._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ResourceList;

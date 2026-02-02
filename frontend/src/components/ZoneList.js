import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Card } from "react-bootstrap";

const ZoneList = () => {
  const [zones, setZones] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/zones";

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      const res = await axios.get(API_URL);
      setZones(res.data);
    } catch (err) {
      console.error("Cannot fetch zones:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ name: "", description: "" });
      fetchZones();
    } catch (err) {
      console.error("Error saving zone:", err);
      alert("Error saving zone. Check backend.");
    }
  };

  const handleEdit = (zone) => {
    setEditId(zone._id);
    setFormData({ name: zone.name, description: zone.description });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({ name: "", description: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this zone?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchZones();
      } catch (err) {
        console.error("Error deleting zone:", err);
      }
    }
  };

  return (
    <div className="container my-4">
      <h3>📍 Zone Management</h3>

      <Card className="p-3 mb-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Zone Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            {editId ? "Update Zone" : "Add Zone"}
          </Button>
          {editId && (
            <Button
              variant="secondary"
              className="mt-3 ms-2"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
        </Form>
      </Card>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Zone Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => (
            <tr key={zone._id}>
              <td>{zone.name}</td>
              <td>{zone.description}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(zone)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(zone._id)}
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

export default ZoneList;

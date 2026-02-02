import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Card } from "react-bootstrap";

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [zones, setZones] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    availability: true,
    zone_id: "",
  });
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/volunteers";
  const ZONE_API = "http://localhost:5000/api/zones";

  useEffect(() => {
    fetchVolunteers();
    fetchZones();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(API_URL);
      setVolunteers(res.data);
    } catch (err) {
      console.error("Could not fetch volunteers:", err);
    }
  };

  const fetchZones = async () => {
    try {
      const res = await axios.get(ZONE_API);
      setZones(res.data);
    } catch (err) {
      console.error("Could not fetch zones:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      skills: formData.skills.split(",").map((s) => s.trim()),
      availability: formData.availability,
      zone_id: formData.zone_id || null,
    };
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post(API_URL, payload);
      }
      setFormData({ name: "", skills: "", availability: true, zone_id: "" });
      fetchVolunteers();
    } catch (err) {
      console.error("Error saving volunteer:", err);
    }
  };

  const handleEdit = (vol) => {
    setEditId(vol._id);
    setFormData({
      name: vol.name,
      skills: vol.skills.join(", "),
      availability: vol.availability,
      zone_id: vol.zone_id?._id || "",
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({ name: "", skills: "", availability: true, zone_id: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this volunteer?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchVolunteers();
    }
  };

  return (
    <div className="container my-4">
      <h3>🧑‍🤝‍🧑 Volunteer Management</h3>

      <Card className="p-3 mb-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Skills (comma separated)</Form.Label>
            <Form.Control
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
            />
          </Form.Group>

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
                  {z.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Check
              type="checkbox"
              label="Available"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-2">
            {editId ? "Update" : "Add"}
          </Button>
          {editId && (
            <Button
              variant="secondary"
              className="mt-2 ms-2"
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
            <th>Name</th>
            <th>Skills</th>
            <th>Available</th>
            <th>Zone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((vol) => (
            <tr key={vol._id}>
              <td>{vol.name}</td>
              <td>{vol.skills.join(", ")}</td>
              <td>{vol.availability ? "Yes" : "No"}</td>
              <td>{vol.zone_id?.name || "N/A"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(vol)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(vol._id)}
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

export default VolunteerList;

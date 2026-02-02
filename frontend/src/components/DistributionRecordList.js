import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Card } from "react-bootstrap";

const DistributionRecordList = () => {
  const [records, setRecords] = useState([]);
  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [resources, setResources] = useState([]);
  const [zones, setZones] = useState([]);
  const [formData, setFormData] = useState({
    request: "",
    volunteer: "",
    resource: "",
    zone: "",
    quantity_distributed: "",
    date: "",
  });
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/distributions";
  const REQUEST_API = "http://localhost:5000/api/requests";
  const VOLUNTEER_API = "http://localhost:5000/api/volunteers";
  const RESOURCE_API = "http://localhost:5000/api/resources";
  const ZONE_API = "http://localhost:5000/api/zones";

  useEffect(() => {
    fetchRecords();
    fetchRequests();
    fetchVolunteers();
    fetchResources();
    fetchZones();
  }, []);

  // Fetch all distribution records
  const fetchRecords = async () => {
    try {
      const res = await axios.get(API_URL);
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(REQUEST_API);
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(VOLUNTEER_API);
      setVolunteers(res.data);
    } catch (err) {
      console.error("Error fetching volunteers:", err);
    }
  };

  const fetchResources = async () => {
    try {
      const res = await axios.get(RESOURCE_API);
      setResources(res.data);
    } catch (err) {
      console.error("Error fetching resources:", err);
    }
  };

  const fetchZones = async () => {
    try {
      const res = await axios.get(ZONE_API);
      setZones(res.data);
    } catch (err) {
      console.error("Error fetching zones:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      request: formData.request,
      volunteer: formData.volunteer,
      resource: formData.resource,
      zone: formData.zone,
      quantity_distributed: parseInt(formData.quantity_distributed),
      date: formData.date || new Date(),
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post(API_URL, payload);
      }
      setFormData({
        request: "",
        volunteer: "",
        resource: "",
        zone: "",
        quantity_distributed: "",
        date: "",
      });
      fetchRecords();
    } catch (err) {
      console.error("Error saving record:", err);
    }
  };

  const handleEdit = (r) => {
    setEditId(r._id);
    setFormData({
      request: r.request?._id || "",
      volunteer: r.volunteer?._id || "",
      resource: r.resource?._id || "",
      zone: r.zone?._id || "",
      quantity_distributed: r.quantity_distributed,
      date: r.date ? r.date.split("T")[0] : "",
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({
      request: "",
      volunteer: "",
      resource: "",
      zone: "",
      quantity_distributed: "",
      date: "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchRecords();
      } catch (err) {
        console.error("Error deleting record:", err);
      }
    }
  };

  return (
    <div className="container my-4">
      <h3 className="mb-3">📦 Distribution Records</h3>

      <Card className="p-3 mb-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          {/* Request Selection */}
          <Form.Group className="mb-2">
            <Form.Label>Request</Form.Label>
            <Form.Select
              name="request"
              value={formData.request}
              onChange={handleChange}
              required
            >
              <option value="">Select Request</option>
              {requests.map((req) => (
                <option key={req._id} value={req._id}>
                  {req.disaster?.name || "Request"} - {req.status}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Volunteer Selection */}
          <Form.Group className="mb-2">
            <Form.Label>Volunteer</Form.Label>
            <Form.Select
              name="volunteer"
              value={formData.volunteer}
              onChange={handleChange}
              required
            >
              <option value="">Select Volunteer</option>
              {volunteers.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.name} ({v.contact})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Resource Selection */}
          <Form.Group className="mb-2">
            <Form.Label>Resource</Form.Label>
            <Form.Select
              name="resource"
              value={formData.resource}
              onChange={handleChange}
              required
            >
              <option value="">Select Resource</option>
              {resources.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name} ({r.unit})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Zone Selection */}
          <Form.Group className="mb-2">
            <Form.Label>Zone</Form.Label>
            <Form.Select
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              required
            >
              <option value="">Select Zone</option>
              {zones.map((z) => (
                <option key={z._id} value={z._id}>
                  {z.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Quantity Distributed */}
          <Form.Group className="mb-2">
            <Form.Label>Quantity Distributed</Form.Label>
            <Form.Control
              type="number"
              name="quantity_distributed"
              value={formData.quantity_distributed}
              onChange={handleChange}
              placeholder="Enter quantity"
              required
            />
          </Form.Group>

          {/* Date */}
          <Form.Group className="mb-2">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {editId ? "Update Record" : "Add Record"}
          </Button>

          {editId && (
            <Button variant="secondary" className="ms-2" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </Form>
      </Card>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Request</th>
            <th>Volunteer</th>
            <th>Resource</th>
            <th>Zone</th>
            <th>Quantity Distributed</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.request?.disaster?.name || r.request?._id || "N/A"}</td>
              <td>{r.volunteer?.name || "N/A"}</td>
              <td>{r.resource?.name || "N/A"}</td>
              <td>{r.zone?.name || "N/A"}</td>
              <td>{r.quantity_distributed}</td>
              <td>{new Date(r.date).toLocaleDateString()}</td>
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

export default DistributionRecordList;

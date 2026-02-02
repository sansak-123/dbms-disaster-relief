import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Card } from "react-bootstrap";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [disasters, setDisasters] = useState([]);
  const [zones, setZones] = useState([]);
  const [resources, setResources] = useState([]);

  const [formData, setFormData] = useState({
    disaster: "",
    zone: "",
    resource: "",
    quantity: "",
    remarks: "",
    status: "Pending",
  });

  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/requests";
  const DISASTER_API = "http://localhost:5000/api/disasters";
  const RESOURCE_API = "http://localhost:5000/api/resources";
  const ZONE_API = "http://localhost:5000/api/zones";

  // Fetch data on mount
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [reqRes, disRes, resRes, zoneRes] = await Promise.all([
        axios.get(API_URL),
        axios.get(DISASTER_API),
        axios.get(RESOURCE_API),
        axios.get(ZONE_API),
      ]);
      setRequests(reqRes.data);
      setDisasters(disRes.data);
      setResources(resRes.data);
      setZones(zoneRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit (add/update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      disaster: formData.disaster,
      zone: formData.zone,
      resource: formData.resource,
      quantity: parseInt(formData.quantity),
      remarks: formData.remarks,
      status: formData.status,
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post(API_URL, payload);
      }

      setFormData({
        disaster: "",
        zone: "",
        resource: "",
        quantity: "",
        remarks: "",
        status: "Pending",
      });
      fetchAll();
    } catch (err) {
      console.error("Error saving request:", err);
      alert("Failed to save request. Check backend logs.");
    }
  };

  // Edit existing record
  const handleEdit = (req) => {
    setEditId(req._id);
    setFormData({
      disaster: req.disaster?._id || "",
      zone: req.zone?._id || "",
      resource: req.resource?._id || "",
      quantity: req.quantity || "",
      remarks: req.remarks || "",
      status: req.status || "Pending",
    });
  };

  // Delete request
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchAll();
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditId(null);
    setFormData({
      disaster: "",
      zone: "",
      resource: "",
      quantity: "",
      remarks: "",
      status: "Pending",
    });
  };

  return (
    <div className="container my-4">
      <h3 className="mb-3">📋 Resource Requests</h3>

      {/* Request Form */}
      <Card className="p-3 mb-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          {/* Disaster */}
          <Form.Group className="mb-2">
            <Form.Label>Disaster</Form.Label>
            <Form.Select
              name="disaster"
              value={formData.disaster}
              onChange={handleChange}
              required
            >
              <option value="">Select Disaster</option>
              {disasters.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.type} — {d.location}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Zone */}
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

          {/* Resource */}
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

          {/* Quantity */}
          <Form.Group className="mb-2">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Remarks */}
          <Form.Group className="mb-2">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Optional notes or reason for request..."
            />
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-2">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Fulfilled">Fulfilled</option>
              <option value="Rejected">Rejected</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            {editId ? "Update Request" : "Add Request"}
          </Button>
          {editId && (
            <Button variant="secondary" className="ms-2" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </Form>
      </Card>

      {/* Request Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Disaster</th>
            <th>Zone</th>
            <th>Resource</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Requested Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.disaster?.type || "—"}</td>
              <td>{req.zone?.name || "—"}</td>
              <td>{req.resource?.name || "—"}</td>
              <td>{req.quantity}</td>
              <td>{req.status}</td>
              <td>{req.remarks || "—"}</td>
              <td>
                {req.requested_date
                  ? new Date(req.requested_date).toLocaleDateString()
                  : "—"}
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(req)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(req._id)}
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

export default RequestList;

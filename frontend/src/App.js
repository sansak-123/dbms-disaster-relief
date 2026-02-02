import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  AlertTriangle,
  Users,
  Package,
  ClipboardList,
  MapPin,
  FileText,
  Leaf,
  LogOut,
  Shield,
  Activity,
  ClipboardCheck, // ✅ Added icon for audit logs
} from "lucide-react";

// Import Pages
import Home from "./Home";
import Login from "./Login";

// Import Components
import Navbar from "./components/Navbar";
import DisasterList from "./components/DisasterList";
import VolunteerList from "./components/VolunteerList";
import ResourceList from "./components/ResourceList";
import RequestList from "./components/RequestList";
import ZoneList from "./components/ZoneList";
import DistributionRecordList from "./components/DistributionRecordList";
import AuditLogList from "./components/AuditLogList"; // ✅ Added

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
      setCurrentPage("dashboard");
    }
  }, []);

  const handleNavigateToLogin = () => {
    setCurrentPage("login");
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentPage("dashboard");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage("home");
    localStorage.removeItem("user");
  };

  // Render Home Page
  if (currentPage === "home") {
    return <Home onNavigateToLogin={handleNavigateToLogin} />;
  }

  // Render Login Page
  if (currentPage === "login") {
    return <Login onLogin={handleLogin} />;
  }

  // Render Dashboard (Authenticated)
  return (
    <div className="app-wrapper">
      {/* Navbar Section */}
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-header-actions">
              <div className="hero-icon-wrapper">
                <Shield className="hero-icon" />
              </div>
              <button onClick={handleLogout} className="logout-button">
                <LogOut className="logout-icon" />
                <span>Logout</span>
              </button>
            </div>
            <h1 className="hero-title">Disaster Relief Management System</h1>
            <p className="hero-subtitle">
              <Activity className="subtitle-icon" />
              <span>Welcome back, {user?.name || user?.email}</span>
              <span className="separator">•</span>
              <span>Coordinating humanitarian response</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="container dashboard-container">
        {/* Responsive Grid Layout */}
        <div className="row g-4">
          {/* Disasters */}
          <div className="col-lg-6 col-md-12" id="disasters">
            <div className="dashboard-card disasters-card">
              <div className="card-header-custom">
                <div className="card-icon-wrapper">
                  <AlertTriangle className="card-icon" />
                </div>
                <div className="card-title-group">
                  <h3 className="card-title">Active Disasters</h3>
                  <p className="card-subtitle">
                    Emergency situations requiring immediate attention
                  </p>
                </div>
              </div>
              <div className="card-body-custom">
                <DisasterList />
              </div>
            </div>
          </div>

          {/* Volunteers */}
          <div className="col-lg-6 col-md-12" id="volunteers">
            <div className="dashboard-card volunteers-card">
              <div className="card-header-custom">
                <div className="card-icon-wrapper">
                  <Users className="card-icon" />
                </div>
                <div className="card-title-group">
                  <h3 className="card-title">Volunteer Network</h3>
                  <p className="card-subtitle">
                    Community responders ready to assist
                  </p>
                </div>
              </div>
              <div className="card-body-custom">
                <VolunteerList />
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="col-lg-6 col-md-12" id="resources">
            <div className="dashboard-card resources-card">
              <div className="card-header-custom">
                <div className="card-icon-wrapper">
                  <Package className="card-icon" />
                </div>
                <div className="card-title-group">
                  <h3 className="card-title">Resource Inventory</h3>
                  <p className="card-subtitle">
                    Available supplies and materials
                  </p>
                </div>
              </div>
              <div className="card-body-custom">
                <ResourceList />
              </div>
            </div>
          </div>

          {/* Requests */}
          <div className="col-lg-6 col-md-12" id="requests">
            <div className="dashboard-card requests-card">
              <div className="card-header-custom">
                <div className="card-icon-wrapper">
                  <ClipboardList className="card-icon" />
                </div>
                <div className="card-title-group">
                  <h3 className="card-title">Aid Requests</h3>
                  <p className="card-subtitle">
                    Community needs and priority requests
                  </p>
                </div>
              </div>
              <div className="card-body-custom">
                <RequestList />
              </div>
            </div>
          </div>

          {/* Zones */}
          <div className="col-lg-6 col-md-12" id="zones">
            <div className="dashboard-card zones-card">
              <div className="card-header-custom">
                <div className="card-icon-wrapper">
                  <MapPin className="card-icon" />
                </div>
                <div className="card-title-group">
                  <h3 className="card-title">Affected Zones</h3>
                  <p className="card-subtitle">
                    Geographic areas under relief coverage
                  </p>
                </div>
              </div>
              <div className="card-body-custom">
                <ZoneList />
              </div>
            </div>
          </div>

          {/* Distribution Records */}
          <div className="col-lg-6 col-md-12" id="distribution">
            <div className="dashboard-card distribution-card">
              <div className="card-header-custom">
                <div className="card-icon-wrapper">
                  <FileText className="card-icon" />
                </div>
                <div className="card-title-group">
                  <h3 className="card-title">Distribution Records</h3>
                  <p className="card-subtitle">
                    Aid delivery and tracking logs
                  </p>
                </div>
              </div>
              <div className="card-body-custom">
                <DistributionRecordList />
              </div>
            </div>
          </div>

          {/* ✅ NEW SECTION: Audit Logs */}
          <div className="col-lg-12 col-md-12" id="auditlogs">
            <div className="dashboard-card auditlogs-card">
              <div className="card-header-custom">
                <div className="card-icon-wrapper">
                  <ClipboardCheck className="card-icon" />
                </div>
                <div className="card-title-group">
                  <h3 className="card-title">System Audit Logs</h3>
                  <p className="card-subtitle">
                    Records of all changes and system actions
                  </p>
                </div>
              </div>
              <div className="card-body-custom">
                <AuditLogList />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <Leaf className="footer-icon" />
              <span className="footer-brand">Disaster Relief Management</span>
            </div>
            <p className="footer-text">
              © 2025 Disaster Relief System • Supporting communities in times of
              need
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

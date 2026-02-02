import React from "react";
import {
  Globe,
  Leaf,
  Users,
  Package,
  MapPin,
  Heart,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Mail,
  Phone,
  MapPinned,
} from "lucide-react";
import "./Home.css";

function Home({ onNavigateToLogin }) {
  return (
    <div className="home-wrapper">
      {/* Navigation Bar */}
      <nav className="home-navbar">
        <div className="container">
          <div className="navbar-content">
            <div className="navbar-brand">
              <Leaf className="brand-icon" />
              <span className="brand-text">Disaster Relief</span>
            </div>
            <div className="navbar-links">
              <a href="#features" className="nav-link">
                Features
              </a>
              <a href="#about" className="nav-link">
                About
              </a>
              <a href="#contact" className="nav-link">
                Contact
              </a>
              <button onClick={onNavigateToLogin} className="login-nav-button">
                Sign In
                <ArrowRight className="button-icon" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-home">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-home-content">
            <div className="hero-badge">
              <Zap className="badge-icon" />
              <span>Rapid Response • Real-time Coordination</span>
            </div>
            <h1 className="hero-home-title">
              Supporting Communities in Times of Crisis
            </h1>
            <p className="hero-home-description">
              Our comprehensive disaster relief management system helps
              coordinate humanitarian response efforts, manage resources, and
              connect volunteers with communities in need.
            </p>
            <div className="hero-actions">
              <button onClick={onNavigateToLogin} className="primary-button">
                Get Started
                <ArrowRight className="button-icon" />
              </button>
              <button className="secondary-button">Learn More</button>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <Globe className="stat-icon" />
              <div className="stat-info">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Active Monitoring</div>
              </div>
            </div>
            <div className="stat-card">
              <Users className="stat-icon" />
              <div className="stat-info">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Volunteers Ready</div>
              </div>
            </div>
            <div className="stat-card">
              <Package className="stat-icon" />
              <div className="stat-info">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Resources Managed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Comprehensive Relief Management</h2>
            <p className="section-description">
              Everything you need to coordinate effective disaster response
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper red">
                <Shield className="feature-icon" />
              </div>
              <h3 className="feature-title">Disaster Tracking</h3>
              <p className="feature-description">
                Monitor active disasters in real-time with detailed information
                and priority assessment for rapid response.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper green">
                <Users className="feature-icon" />
              </div>
              <h3 className="feature-title">Volunteer Network</h3>
              <p className="feature-description">
                Connect with trained volunteers ready to assist. Manage
                assignments and track volunteer availability.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper blue">
                <Package className="feature-icon" />
              </div>
              <h3 className="feature-title">Resource Management</h3>
              <p className="feature-description">
                Track and allocate essential supplies, equipment, and materials
                efficiently across affected zones.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper yellow">
                <MapPin className="feature-icon" />
              </div>
              <h3 className="feature-title">Zone Mapping</h3>
              <p className="feature-description">
                Geographic visualization of affected areas with detailed
                coverage information and resource allocation.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper purple">
                <Heart className="feature-icon" />
              </div>
              <h3 className="feature-title">Aid Requests</h3>
              <p className="feature-description">
                Prioritize and manage community aid requests with intelligent
                routing and resource matching.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper teal">
                <Zap className="feature-icon" />
              </div>
              <h3 className="feature-title">Real-time Updates</h3>
              <p className="feature-description">
                Stay informed with live updates, notifications, and
                comprehensive distribution tracking logs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="about-title">Our Mission</h2>
              <p className="about-description">
                We believe that effective disaster relief requires coordination,
                transparency, and swift action. Our platform brings together
                relief organizations, volunteers, and communities to ensure that
                help reaches those who need it most, when they need it most.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <CheckCircle className="check-icon" />
                  <span>Transparent resource allocation</span>
                </div>
                <div className="about-feature">
                  <CheckCircle className="check-icon" />
                  <span>Real-time coordination</span>
                </div>
                <div className="about-feature">
                  <CheckCircle className="check-icon" />
                  <span>Community-driven support</span>
                </div>
                <div className="about-feature">
                  <CheckCircle className="check-icon" />
                  <span>Data-driven decision making</span>
                </div>
              </div>
              <button onClick={onNavigateToLogin} className="about-button">
                Join Our Network
                <ArrowRight className="button-icon" />
              </button>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <Globe className="placeholder-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-description">
              Have questions? We're here to help
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <Mail className="contact-icon" />
              <h3 className="contact-title">Email Us</h3>
              <p className="contact-info">support@disasterrelief.org</p>
            </div>
            <div className="contact-card">
              <Phone className="contact-icon" />
              <h3 className="contact-title">Call Us</h3>
              <p className="contact-info">+91 9009009001</p>
            </div>
            <div className="contact-card">
              <MapPinned className="contact-icon" />
              <h3 className="contact-title">Visit Us</h3>
              <p className="contact-info">Vellore,Tamil Nadu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-brand">
                <Leaf className="footer-brand-icon" />
                <span className="footer-brand-text">Disaster Relief</span>
              </div>
              <p className="footer-description">
                Supporting communities through coordinated humanitarian response
                and efficient resource management.
              </p>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#" onClick={onNavigateToLogin}>
                    Sign In
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Resources</h4>
              <ul className="footer-links">
                <li>
                  <a href="#">Documentation</a>
                </li>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Connect</h4>
              <ul className="footer-links">
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">LinkedIn</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2025 Disaster Relief Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

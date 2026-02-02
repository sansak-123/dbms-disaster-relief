import React, { useState, useEffect } from "react";
import {
  Shield,
  AlertTriangle,
  Users,
  Package,
  ClipboardList,
  MapPin,
  FileText,
} from "lucide-react";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = [
        "disasters",
        "volunteers",
        "resources",
        "requests",
        "zones",
        "distribution",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { id: "disasters", label: "Disasters", icon: AlertTriangle },
    { id: "volunteers", label: "Volunteers", icon: Users },
    { id: "resources", label: "Resources", icon: Package },
    { id: "requests", label: "Requests", icon: ClipboardList },
    { id: "zones", label: "Zones", icon: MapPin },
    { id: "distribution", label: "Distribution", icon: FileText },
  ];

  return (
    <>
      <style>{`
        :root {
          --forest-green: #2D5F3F;
          --moss-green: #4A7C59;
          --sage-green: #6B8E7F;
          --warm-white: #FDFAF5;
          --bg-sage: #E8EDE9;
          --text-dark: #2C3E2C;
          --text-light: #6B7D6B;
          --border-green: #D0DDD0;
        }

        .earthy-navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #000000;
          padding: 0;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .earthy-navbar.scrolled {
          background: rgba(0, 0, 0, 0.98);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--warm-white);
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.3px;
          transition: all 0.3s ease;
        }

        .navbar-brand:hover {
          color: var(--warm-white);
          transform: translateX(-2px);
        }

        .brand-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .brand-icon {
          color: var(--warm-white);
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.3s ease;
          cursor: pointer;
          background: transparent;
          border: none;
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .nav-link:hover::before {
          opacity: 1;
        }

        .nav-link:hover {
          color: var(--warm-white);
          transform: translateY(-2px);
        }

        .nav-link.active {
          background: rgba(255, 255, 255, 0.15);
          color: var(--warm-white);
          font-weight: 600;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 3px;
          background: var(--warm-white);
          border-radius: 2px;
        }

        .nav-icon {
          width: 18px;
          height: 18px;
          stroke-width: 2;
        }
      `}</style>

      <nav className={`earthy-navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <a
            className="navbar-brand"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="brand-icon-wrapper">
              <Shield className="brand-icon" size={20} strokeWidth={2} />
            </div>
            <span>Disaster Management</span>
          </a>

          {/* Desktop Menu */}
          <ul className="nav-menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id} className="nav-item">
                  <button
                    className={`nav-link ${
                      activeSection === item.id ? "active" : ""
                    }`}
                    onClick={() => handleScroll(item.id)}
                  >
                    <Icon className="nav-icon" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

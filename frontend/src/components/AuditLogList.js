import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Trash2,
  RefreshCw,
  FileText,
  Clock,
  User,
  Database,
} from "lucide-react";

const AuditLogList = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "http://localhost:5000/api/auditlogs";

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API_URL);
      setLogs(res.data);
    } catch (err) {
      console.error("Error fetching logs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearLogs = async () => {
    if (window.confirm("Are you sure you want to clear all logs?")) {
      try {
        await axios.delete(API_URL);
        fetchLogs();
      } catch (err) {
        console.error("Error clearing logs:", err);
      }
    }
  };

  const getActionColor = (action) => {
    const colors = {
      CREATE: "action-badge-create",
      UPDATE: "action-badge-update",
      DELETE: "action-badge-delete",
      READ: "action-badge-read",
    };
    return colors[action] || "action-badge-default";
  };

  return (
    <>
      <style>{`
        :root {
          --forest-green: #2D5F3F;
          --moss-green: #4A7C59;
          --sage-green: #6B8E7F;
          --olive-green: #87A878;
          --clay-orange: #C8814F;
          --terracotta: #B85C38;
          --earth-brown: #8B6F47;
          --sand-beige: #D4A574;
          --stone-gray: #7D8471;
          --pebble-gray: #9FA799;
          --soft-cream: #F5F1E8;
          --warm-white: #FDFAF5;
          --bg-cream: #FAF7F0;
          --bg-white: #FFFFFF;
          --bg-light-green: #F0F4F1;
          --bg-sage: #E8EDE9;
          --text-dark: #2C3E2C;
          --text-medium: #4A5D4A;
          --text-light: #6B7D6B;
          --text-muted: #8B9B8B;
          --border-green: #D0DDD0;
          --border-light: #E5EBE5;
        }

        .audit-log-wrapper {
          background: var(--bg-cream);
          min-height: 100%;
          padding: 0;
        }

        .audit-header-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .audit-title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .audit-icon-wrapper {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--sage-green), var(--olive-green));
          border-radius: 10px;
          flex-shrink: 0;
        }

        .audit-icon {
          color: var(--warm-white);
        }

        .audit-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-dark);
          margin: 0;
          letter-spacing: -0.3px;
        }

        .audit-subtitle {
          font-size: 0.875rem;
          color: var(--text-light);
          margin: 0.25rem 0 0 0;
        }

        .audit-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .audit-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          border: 2px solid transparent;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(45, 95, 63, 0.08);
        }

        .audit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(45, 95, 63, 0.16);
        }

        .audit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-refresh {
          background: linear-gradient(135deg, var(--forest-green), var(--moss-green));
          color: var(--warm-white);
        }

        .btn-refresh:hover:not(:disabled) {
          background: linear-gradient(135deg, var(--moss-green), var(--sage-green));
        }

        .btn-clear {
          background: linear-gradient(135deg, var(--terracotta), var(--clay-orange));
          color: var(--warm-white);
        }

        .btn-clear:hover {
          background: linear-gradient(135deg, #A04A2A, var(--terracotta));
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .stat-card {
          padding: 1.25rem;
          border-radius: 10px;
          border: 2px solid var(--border-light);
          background: var(--bg-white);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(45, 95, 63, 0.12);
        }

        .stat-card-total {
          background: linear-gradient(135deg, rgba(107, 142, 127, 0.08), rgba(135, 168, 120, 0.05));
          border-color: var(--sage-green);
        }

        .stat-card-create {
          background: linear-gradient(135deg, rgba(74, 124, 89, 0.08), rgba(107, 142, 127, 0.05));
          border-color: var(--moss-green);
        }

        .stat-card-update {
          background: linear-gradient(135deg, rgba(125, 132, 113, 0.08), rgba(159, 167, 153, 0.05));
          border-color: var(--stone-gray);
        }

        .stat-card-delete {
          background: linear-gradient(135deg, rgba(184, 92, 56, 0.08), rgba(200, 129, 79, 0.05));
          border-color: var(--terracotta);
        }

        .stat-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-medium);
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-dark);
        }

        .table-container {
          margin-top: 1.5rem;
          background: var(--bg-white);
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid var(--border-light);
          box-shadow: 0 2px 4px rgba(45, 95, 63, 0.08);
        }

        .audit-table {
          width: 100%;
          border-collapse: collapse;
        }

        .audit-table thead {
          background: linear-gradient(135deg, var(--forest-green), var(--moss-green));
        }

        .audit-table th {
          padding: 1rem 1.25rem;
          text-align: left;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--warm-white);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .audit-table tbody tr {
          border-bottom: 1px solid var(--border-light);
          transition: background-color 0.2s ease;
        }

        .audit-table tbody tr:hover {
          background: var(--bg-sage);
        }

        .audit-table tbody tr:last-child {
          border-bottom: none;
        }

        .audit-table td {
          padding: 1rem 1.25rem;
          font-size: 0.875rem;
          color: var(--text-medium);
        }

        .action-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.375rem 0.875rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: 2px solid;
        }

        .action-badge-create {
          background: rgba(74, 124, 89, 0.12);
          color: var(--moss-green);
          border-color: var(--moss-green);
        }

        .action-badge-update {
          background: rgba(125, 132, 113, 0.12);
          color: var(--stone-gray);
          border-color: var(--stone-gray);
        }

        .action-badge-delete {
          background: rgba(184, 92, 56, 0.12);
          color: var(--terracotta);
          border-color: var(--terracotta);
        }

        .action-badge-read {
          background: rgba(159, 167, 153, 0.12);
          color: var(--pebble-gray);
          border-color: var(--pebble-gray);
        }

        .action-badge-default {
          background: rgba(139, 111, 71, 0.12);
          color: var(--earth-brown);
          border-color: var(--earth-brown);
        }

        .cell-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cell-icon {
          width: 16px;
          height: 16px;
          color: var(--text-light);
          flex-shrink: 0;
        }

        .record-id {
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.75rem;
          background: var(--bg-sage);
          padding: 0.25rem 0.625rem;
          border-radius: 6px;
          color: var(--text-dark);
          border: 1px solid var(--border-green);
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          color: var(--pebble-gray);
          margin-bottom: 1.5rem;
        }

        .empty-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-medium);
          margin-bottom: 0.5rem;
        }

        .empty-subtitle {
          font-size: 0.875rem;
          color: var(--text-light);
        }

        .loading-state {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          color: var(--sage-green);
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .table-wrapper {
          overflow-x: auto;
        }

        @media (max-width: 768px) {
          .audit-header-section {
            flex-direction: column;
            align-items: flex-start;
          }

          .audit-actions {
            width: 100%;
          }

          .audit-btn {
            flex: 1;
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .audit-table th,
          .audit-table td {
            padding: 0.75rem;
            font-size: 0.8125rem;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="audit-log-wrapper">
        {/* Header Section */}
        <div className="audit-header-section">
          <div className="audit-title-group">
            <div className="audit-icon-wrapper">
              <FileText className="audit-icon" size={24} strokeWidth={2} />
            </div>
            <div>
              <h2 className="audit-title">System Audit Logs</h2>
              <p className="audit-subtitle">
                Track all system activities and changes
              </p>
            </div>
          </div>

          <div className="audit-actions">
            <button
              onClick={fetchLogs}
              disabled={isLoading}
              className="audit-btn btn-refresh"
            >
              <RefreshCw
                size={16}
                strokeWidth={2}
                className={isLoading ? "loading-spinner" : ""}
              />
              Refresh
            </button>
            <button onClick={clearLogs} className="audit-btn btn-clear">
              <Trash2 size={16} strokeWidth={2} />
              Clear All
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card stat-card-total">
            <div className="stat-label">Total Logs</div>
            <div className="stat-value">{logs.length}</div>
          </div>
          <div className="stat-card stat-card-create">
            <div className="stat-label">Creates</div>
            <div className="stat-value">
              {
                logs.filter(
                  (l) =>
                    l.action.toUpperCase().includes("ADD") ||
                    l.action.toUpperCase().includes("CREATE")
                ).length
              }
            </div>
          </div>

          <div className="stat-card stat-card-update">
            <div className="stat-label">Updates</div>
            <div className="stat-value">
              {
                logs.filter(
                  (l) =>
                    l.action.toUpperCase().includes("UPDATE") ||
                    l.action.toUpperCase().includes("EDIT")
                ).length
              }
            </div>
          </div>

          <div className="stat-card stat-card-delete">
            <div className="stat-label">Deletes</div>
            <div className="stat-value">
              {
                logs.filter(
                  (l) =>
                    l.action.toUpperCase().includes("DELETE") ||
                    l.action.toUpperCase().includes("REMOVE")
                ).length
              }
            </div>
          </div>
        </div>
        {/* Table Section */}
        <div className="table-container">
          {isLoading ? (
            <div className="loading-state">
              <RefreshCw className="loading-spinner" strokeWidth={2} />
            </div>
          ) : logs.length === 0 ? (
            <div className="empty-state">
              <FileText className="empty-icon" strokeWidth={1.5} />
              <div className="empty-title">No audit logs found</div>
              <div className="empty-subtitle">
                System activities will appear here
              </div>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Collection</th>
                    <th>Record ID</th>
                    <th>Performed By</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log._id}>
                      <td>
                        <span
                          className={`action-badge ${getActionColor(
                            log.action
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td>
                        <div className="cell-content">
                          <Database className="cell-icon" strokeWidth={2} />
                          <span style={{ fontWeight: 500 }}>
                            {log.collectionName}
                          </span>
                        </div>
                      </td>
                      <td>
                        <code className="record-id">{log.recordId}</code>
                      </td>
                      <td>
                        <div className="cell-content">
                          <User className="cell-icon" strokeWidth={2} />
                          <span>{log.performedBy}</span>
                        </div>
                      </td>
                      <td>
                        <div className="cell-content">
                          <Clock className="cell-icon" strokeWidth={2} />
                          <span style={{ fontSize: "0.8125rem" }}>
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AuditLogList;

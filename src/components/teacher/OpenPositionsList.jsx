import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, Filter } from 'lucide-react';
import { api } from '../../services/api';


export default function OpenPositionsList({ onApplyRole }) {
  const [positions, setPositions] = useState([]);
  const [activeDept, setActiveDept] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPositions() {
      try {
        const data = await api.getOpenPositions();
        setPositions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPositions();
  }, []);

  const departments = ['All', 'Academics & Content', 'AI & Educational Research', 'Institutional Growth'];

  const filteredPositions = activeDept === 'All' 
    ? positions 
    : positions.filter(p => p.department === activeDept);

  return (
    <div className="open-positions-container" id="open-roles">
      <div className="positions-header">
        <div className="positions-title-block">
          <span className="pill-badge pill-peach mb-2">Join the Core Team</span>
          <h3 className="positions-main-heading">Current Academic &amp; Strategic Openings</h3>
          <p className="positions-sub-heading">
            Whether you want flexible per-paper authoring or a dedicated leadership position, shape how millions of board candidates prepare.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="dept-filter-bar">
          <div className="filter-icon-tag">
            <Filter size={14} className="text-muted" />
            <span>Department:</span>
          </div>
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              className={`dept-tab-btn ${activeDept === dept ? 'active' : ''}`}
              onClick={() => setActiveDept(dept)}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Positions Grid */}
      {isLoading ? (
        <div className="loading-positions-box">
          <div className="loading-spinner"></div>
          <span>Loading open career roles...</span>
        </div>
      ) : (
        <div className="positions-grid">
          {filteredPositions.map((job) => (
            <div key={job.id} className="position-card glass-panel-elevated">
              <div className="job-top-bar">
                <span className="job-badge">{job.badge}</span>
                <span className="job-dept">{job.department}</span>
              </div>

              <h4 className="job-title">{job.title}</h4>
              <p className="job-desc">{job.description}</p>

              <div className="job-meta-chips">
                <div className="meta-chip">
                  <MapPin size={13} className="text-emerald" />
                  <span>{job.location}</span>
                </div>
                <div className="meta-chip">
                  <Clock size={13} className="text-emerald" />
                  <span>{job.type}</span>
                </div>
                <div className="meta-chip">
                  <Briefcase size={13} className="text-emerald" />
                  <span>{job.experience}</span>
                </div>
              </div>

              <div className="job-payout-box">
                <span className="comp-label">Compensation:</span>
                <strong className="comp-value">{job.compensation}</strong>
              </div>

              <div className="job-action-row">
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={() => onApplyRole(job.title)}
                >
                  <span>Apply for this Role</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .open-positions-container {
          margin-top: 3.5rem;
        }

        .positions-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .positions-title-block {
          max-width: 650px;
          margin-bottom: 1.5rem;
        }

        .positions-main-heading {
          font-family: var(--font-display);
          font-size: 2rem;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        .positions-sub-heading {
          color: var(--text-muted);
          font-size: 1rem;
        }

        .dept-filter-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
          background: #fbfdfc;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          border: 1.5px solid rgba(103, 192, 144, 0.4);
          box-shadow: 0 4px 16px rgba(18, 65, 112, 0.08);
        }

        .filter-icon-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-light);
          margin-right: 4px;
        }

        .dept-tab-btn {
          background: transparent;
          border: none;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .dept-tab-btn:hover {
          color: var(--text-main);
          background: var(--bg-hover);
        }
        .dept-tab-btn.active {
          background: rgb(18, 65, 112);
          color: #ffffff;
          font-weight: 600;
        }

        .positions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.75rem;
        }

        .position-card {
          background: #f2f5f0;
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          border: 1.5px solid rgba(103, 192, 144, 0.4);
          box-shadow: 0 10px 28px -6px rgba(18, 65, 112, 0.08);
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-smooth), box-shadow var(--transition-smooth);
        }
        .position-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px -8px rgba(33, 91, 99, 0.16);
          border-color: rgb(103, 192, 144);
          background: #f7faf5;
        }

        .job-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .job-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--pastel-lavender-text);
          background: var(--pastel-lavender);
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.3px;
        }

        .job-dept {
          font-size: 0.8rem;
          color: var(--text-light);
          font-weight: 500;
        }

        .job-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          color: var(--text-main);
          margin-bottom: 0.65rem;
          line-height: 1.35;
        }

        .job-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }

        .job-meta-chips {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          margin-bottom: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .meta-chip {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .job-payout-box {
          background: var(--bg-subtle);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          margin-bottom: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .comp-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-light);
          font-weight: 600;
        }

        .comp-value {
          font-size: 0.88rem;
          color: var(--pastel-sage-text);
        }

        .loading-positions-box {
          padding: 3rem;
          text-align: center;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--border-medium);
          border-top-color: var(--brand-emerald);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

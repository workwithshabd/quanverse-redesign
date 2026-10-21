import React, { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle2, ArrowRight, RefreshCw, Briefcase, Mail, Phone, User, Link as LinkIcon, Send } from 'lucide-react';
import { api } from '../../services/api';

export default function JobApplicationModal({ isOpen, job, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    portfolioUrl: '',
    resumeLink: '',
    note: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleClose = useCallback(() => {
    setResult(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.submitGeneralJobApplication({
        ...formData,
        jobId: job?.id || 'general',
        jobTitle: job?.title || 'Open Application',
        department: job?.department || 'General'
      });
      setResult(res);
    } catch (err) {
      console.error(err);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="job-modal-backdrop" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="job-modal-dialog glass-panel-elevated" onClick={e => e.stopPropagation()}>
        <button 
          type="button" 
          className="job-modal-close-btn" 
          onClick={handleClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="job-modal-content">
          {result ? (
            <div className="job-success-state">
              <div className="success-icon-wrap">
                <CheckCircle2 size={44} className="text-emerald" />
              </div>
              <span className="pill-badge pill-sage mb-2">Application Received</span>
              <h3 className="job-success-title">Thank You, {formData.fullName}!</h3>
              <p className="job-success-desc">
                Your application for <strong>{job?.title || 'this role'}</strong> has been submitted directly to our Talent &amp; Hiring team.
              </p>
              <div className="app-id-pill">
                <span>Application ID: <strong>{result.applicationId}</strong></span>
              </div>
              <p className="text-muted text-sm mb-4">
                We review applications weekly. If your background aligns with our engineering &amp; product roadmap, our team will schedule a 30-minute introductory call.
              </p>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleClose}
              >
                <span>Done</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="job-app-form">
              <div className="job-form-header">
                <div className="pill-badge pill-lavender mb-2">
                  <Briefcase size={14} />
                  <span>{job?.department || 'Company Role'}</span>
                </div>
                <h3 className="job-modal-title">Apply for {job?.title || 'Open Position'}</h3>
                <p className="job-modal-sub">
                  Location: <strong>{job?.location || 'Remote'}</strong> • Type: <strong>{job?.type || 'Full-time'}</strong>
                </p>
              </div>

              <div className="form-fields-grid">
                <div className="job-input-group">
                  <label htmlFor="jobFullName">Full Name *</label>
                  <div className="input-wrap">
                    <User size={15} className="input-icon" />
                    <input
                      id="jobFullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="job-control"
                    />
                  </div>
                </div>

                <div className="job-input-group">
                  <label htmlFor="jobEmail">Email Address *</label>
                  <div className="input-wrap">
                    <Mail size={15} className="input-icon" />
                    <input
                      id="jobEmail"
                      name="email"
                      type="email"
                      required
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="job-control"
                    />
                  </div>
                </div>

                <div className="job-input-group">
                  <label htmlFor="jobPhone">Phone Number *</label>
                  <div className="input-wrap">
                    <Phone size={15} className="input-icon" />
                    <input
                      id="jobPhone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="job-control"
                    />
                  </div>
                </div>

                <div className="job-input-group">
                  <label htmlFor="jobResume">Resume / CV Link *</label>
                  <div className="input-wrap">
                    <LinkIcon size={15} className="input-icon" />
                    <input
                      id="jobResume"
                      name="resumeLink"
                      type="url"
                      required
                      placeholder="https://drive.google.com/... or dropbox"
                      value={formData.resumeLink}
                      onChange={handleChange}
                      className="job-control"
                    />
                  </div>
                </div>

                <div className="job-input-group">
                  <label htmlFor="jobLinkedin">LinkedIn / GitHub Profile</label>
                  <input
                    id="jobLinkedin"
                    name="linkedinUrl"
                    type="url"
                    placeholder="https://linkedin.com/in/... or github.com/..."
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    className="job-control"
                  />
                </div>

                <div className="job-input-group">
                  <label htmlFor="jobPortfolio">Portfolio / Work Sample URL</label>
                  <input
                    id="jobPortfolio"
                    name="portfolioUrl"
                    type="url"
                    placeholder="https://mywork.dev or behance.net/..."
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    className="job-control"
                  />
                </div>
              </div>

              <div className="job-input-group mt-3">
                <label htmlFor="jobNote">Why Quanverse? (Brief Cover Note)</label>
                <textarea
                  id="jobNote"
                  name="note"
                  rows={3}
                  placeholder="Tell us what excites you about transforming secondary board exams and solving real educational assessment challenges..."
                  value={formData.note}
                  onChange={handleChange}
                  className="job-control textarea-control"
                ></textarea>
              </div>

              <div className="job-modal-submit-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full shadow-hover"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Submitting Profile...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Application</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .job-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(20, 42, 33, 0.65);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.2s ease-out;
        }

        .job-modal-dialog {
          position: relative;
          background: #ffffff;
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: var(--shadow-elevated);
          border: 1px solid var(--border-medium);
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .job-modal-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-subtle);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
          z-index: 10;
        }
        .job-modal-close-btn:hover {
          background: #f0f0f0;
          color: var(--text-main);
          transform: rotate(90deg);
        }

        .job-modal-content {
          padding: 2.25rem;
          overflow-y: auto;
          max-height: 90vh;
        }

        .job-form-header {
          margin-bottom: 1.5rem;
        }
        .job-modal-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--text-main);
          margin-bottom: 0.25rem;
        }
        .job-modal-sub {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .form-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.15rem;
        }
        @media (max-width: 600px) {
          .form-fields-grid {
            grid-template-columns: 1fr;
          }
        }

        .job-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .job-input-group label {
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 12px;
          color: var(--text-light);
          pointer-events: none;
        }
        .input-wrap .job-control {
          padding-left: 36px;
        }

        .job-control {
          width: 100%;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-medium);
          background: #ffffff;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--text-main);
          transition: border-color var(--transition-fast);
        }
        .job-control:focus {
          outline: none;
          border-color: var(--brand-emerald);
          box-shadow: 0 0 0 3px rgba(30, 63, 49, 0.1);
        }

        .textarea-control {
          resize: vertical;
        }

        .job-modal-submit-row {
          margin-top: 1.75rem;
        }

        .job-success-state {
          text-align: center;
          padding: 2rem 1rem;
        }
        .success-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--pastel-sage);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
        }
        .job-success-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }
        .job-success-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 1.25rem;
        }
        .app-id-pill {
          display: inline-block;
          background: var(--pastel-lavender);
          color: var(--pastel-lavender-text);
          padding: 6px 16px;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          border: 1px solid var(--pastel-lavender-border);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

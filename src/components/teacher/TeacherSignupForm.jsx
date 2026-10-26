import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Send,
  FileText,
  Building,
  Phone,
  Mail,
  User,
  Check,
  RefreshCw,
  Copy
} from 'lucide-react';
import { api } from '../../services/api';

export default function TeacherSignupForm({ onSuccess, isModal = false }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    schoolName: '',
    board: 'CBSE',
    primarySubject: 'Class 10 Mathematics',
    experienceYears: '8-15 years',
    isBoardEvaluator: 'yes',
    roles: ['Question Paper Author'],
    portfolioLink: '',
    shortBio: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const subjectsList = [
    'Class 10 Mathematics (Standard & Basic)',
    'Class 10 Science (Physics, Chemistry, Biology)',
    'Class 10 Social Science (History, Geo, Civics, Eco)',
    'Class 10 English Language & Literature',
    'Class 10 Hindi (Course A & B)'
  ];

  const roleOptions = [
    { id: 'Question Paper Author', label: 'Question Paper Author', desc: 'Create original board-standard questions with full rubric' },
    { id: 'Rubric Reviewer', label: 'Rubric & Step-Marking Reviewer', desc: 'Validate AI marking schemes against official examiner criteria' },
    { id: 'School Pre-board Curator', label: 'School Pre-Board Curator', desc: 'Package curated 80-mark mock papers for schools' }
  ];

  const handleRoleToggle = (roleId) => {
    setFormData(prev => {
      const exists = prev.roles.includes(roleId);
      if (exists) {
        return { ...prev, roles: prev.roles.filter(r => r !== roleId) };
      } else {
        return { ...prev, roles: [...prev.roles, roleId] };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await api.submitTeacherApplication(formData);
      setSubmitResult(result);
      if (onSuccess) onSuccess(result);
    } catch (err) {
      console.error(err);
      alert('Failed to submit application. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (submitResult?.applicationId) {
      navigator.clipboard.writeText(submitResult.applicationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setSubmitResult(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      schoolName: '',
      board: 'CBSE',
      primarySubject: 'Class 10 Mathematics',
      experienceYears: '8-15 years',
      isBoardEvaluator: 'yes',
      roles: ['Question Paper Author'],
      portfolioLink: '',
      shortBio: ''
    });
  };

  if (submitResult) {
    return (
      <div className="teacher-form-success-card">
        <div className="success-icon-badge">
          <CheckCircle2 size={40} className="text-emerald" />
        </div>
        <h3 className="success-title">Welcome to the Educator Network, {formData.fullName}!</h3>
        <p className="success-sub">
          Your credentials have been logged in our Academic Verification Queue.
          Our Chief Board Moderator will review your subject expertise and connect via WhatsApp/Email within <strong>24 to 48 hours</strong>.
        </p>

        <div className="application-ref-box">
          <div className="ref-label">Your Application Reference ID</div>
          <div className="ref-value-row">
            <span className="ref-code">{submitResult.applicationId}</span>
            <button
              type="button"
              className="btn btn-secondary btn-sm copy-btn"
              onClick={handleCopyId}
            >
              {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy ID'}</span>
            </button>
          </div>
        </div>

        <div className="next-steps-timeline">
          <h4 className="timeline-title">What Happens Next:</h4>
          <div className="timeline-step">
            <div className="step-num">1</div>
            <div className="step-content">
              <strong>Syllabus Alignment Check:</strong> Our Senior Academic Lead verifies your CBSE/ICSE affiliation and sample question standards.
            </div>
          </div>
          <div className="timeline-step">
            <div className="step-num">2</div>
            <div className="step-content">
              <strong>15-Minute Authoring Walkthrough:</strong> You receive login credentials to our AI Question Authoring Studio &amp; Royalty Dashboard.
            </div>
          </div>
          <div className="timeline-step">
            <div className="step-num">3</div>
            <div className="step-content">
              <strong>First Payout Cycle:</strong> Begin authoring questions and earn royalties directly into your bank account.
            </div>
          </div>
        </div>

        <div className="success-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            <RefreshCw size={15} />
            <span>Submit Another Application</span>
          </button>
        </div>

        <style>{`
          .teacher-form-success-card {
            background: #f2f5f0;
            border-radius: var(--radius-lg);
            padding: 2.5rem;
            text-align: center;
            border: 1px solid var(--pastel-sage-border);
            box-shadow: var(--shadow-card);
          }
          .success-icon-badge {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            background: var(--pastel-sage);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.25rem;
          }
          .success-title {
            font-family: var(--font-display);
            font-size: 1.6rem;
            color: var(--text-main);
            margin-bottom: 0.75rem;
          }
          .success-sub {
            color: var(--text-muted);
            font-size: 0.95rem;
            line-height: 1.6;
            max-width: 540px;
            margin: 0 auto 1.5rem;
          }
          .application-ref-box {
            background: var(--pastel-lavender);
            border: 1px solid var(--pastel-lavender-border);
            border-radius: var(--radius-md);
            padding: 1.2rem;
            max-width: 440px;
            margin: 0 auto 1.75rem;
          }
          .ref-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--pastel-lavender-text);
            font-weight: 600;
            margin-bottom: 0.4rem;
          }
          .ref-value-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
          }
          .ref-code {
            font-family: var(--font-mono);
            font-size: 1.35rem;
            font-weight: 700;
            color: var(--pastel-lavender-text);
            letter-spacing: 1px;
          }
          .next-steps-timeline {
            text-align: left;
            background: var(--bg-subtle);
            border-radius: var(--radius-md);
            padding: 1.25rem 1.5rem;
            margin-bottom: 1.5rem;
          }
          .timeline-title {
            font-size: 0.95rem;
            font-weight: 700;
            color: var(--text-main);
            margin-bottom: 1rem;
          }
          .timeline-step {
            display: flex;
            gap: 12px;
            margin-bottom: 0.75rem;
            font-size: 0.88rem;
            color: var(--text-muted);
          }
          .step-num {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: var(--brand-emerald);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 700;
            flex-shrink: 0;
            margin-top: 2px;
          }
          .success-actions {
            display: flex;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }

  return (
    <form className={`teacher-signup-form ${isModal ? 'is-modal-form' : ''}`} onSubmit={handleSubmit}>

      {/* Form Header */}
      <div className="form-head">
        <h3 className="form-main-title">Sign Up as an Authoring Educator</h3>
        <p className="form-sub-title">
          Partner with Quanverse to author board-calibrated mock papers, review step-marking schemes, and earn monthly author royalties.
        </p>
      </div>

      {/* Grid: Personal Details */}
      <div className="form-section">
        <h4 className="section-label">1. Educator Information</h4>
        <div className="form-grid-2">
          <div className="input-group">
            <label htmlFor="fullName">Full Name &amp; Title *</label>
            <div className="input-icon-wrap">
              <User size={16} className="input-icon" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="e.g. Dr. Ramesh Gupta"
                value={formData.fullName}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address *</label>
            <div className="input-icon-wrap">
              <Mail size={16} className="input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@school.edu.in or personal"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone / WhatsApp Number *</label>
            <div className="input-icon-wrap">
              <Phone size={16} className="input-icon" />
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="city">City &amp; State *</label>
            <div className="input-icon-wrap">
              <Building size={16} className="input-icon" />
              <input
                id="city"
                name="city"
                type="text"
                required
                placeholder="e.g. New Delhi, NCR"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Academic & Board Specialization */}
      <div className="form-section">
        <h4 className="section-label">2. Academic Background &amp; Subject</h4>
        <div className="form-grid-2">
          <div className="input-group">
            <label htmlFor="schoolName">Current / Past School or Coaching *</label>
            <input
              id="schoolName"
              name="schoolName"
              type="text"
              required
              placeholder="e.g. Delhi Public School / DAV / Self-employed"
              value={formData.schoolName}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="input-group">
            <label htmlFor="board">Primary Board Affiliation *</label>
            <select
              id="board"
              name="board"
              value={formData.board}
              onChange={handleChange}
              className="form-control select-control"
            >
              <option value="CBSE">CBSE (Central Board of Secondary Education)</option>
              <option value="ICSE">CISCE / ICSE (Indian Certificate of Secondary Education)</option>
              <option value="Both">Both CBSE &amp; ICSE</option>
              <option value="State">State Secondary Board</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="primarySubject">Class 10 Subject *</label>
            <select
              id="primarySubject"
              name="primarySubject"
              value={formData.primarySubject}
              onChange={handleChange}
              className="form-control select-control"
            >
              {subjectsList.map((sub, i) => (
                <option key={i} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="experienceYears">Class 10 Teaching Experience *</label>
            <select
              id="experienceYears"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              className="form-control select-control"
            >
              <option value="3-5 years">3 to 5 years</option>
              <option value="5-8 years">5 to 8 years</option>
              <option value="8-15 years">8 to 15 years (Senior PGT/TGT)</option>
              <option value="15+ years">15+ years (Master Examiner / HOD)</option>
            </select>
          </div>
        </div>

        {/* Board Evaluator Radio */}
        <div className="evaluator-flag-box">
          <label className="evaluator-label">
            Have you ever served as an official Board Answer Sheet Evaluator / Head Examiner?
          </label>
          <div className="radio-group">
            <label className={`radio-pill ${formData.isBoardEvaluator === 'yes' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="isBoardEvaluator"
                value="yes"
                checked={formData.isBoardEvaluator === 'yes'}
                onChange={handleChange}
              />
              <span>Yes, Official Board Evaluator</span>
            </label>
            <label className={`radio-pill ${formData.isBoardEvaluator === 'no' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="isBoardEvaluator"
                value="no"
                checked={formData.isBoardEvaluator === 'no'}
                onChange={handleChange}
              />
              <span>No, School Teacher / Tutor</span>
            </label>
          </div>
        </div>
      </div>

      {/* Section: Roles Interested In */}
      <div className="form-section">
        <h4 className="section-label">3. How Would You Like to Collaborate?</h4>
        <div className="roles-checklist">
          {roleOptions.map((role) => {
            const isChecked = formData.roles.includes(role.id);
            return (
              <div
                key={role.id}
                className={`role-choice-card ${isChecked ? 'role-selected' : ''}`}
                onClick={() => handleRoleToggle(role.id)}
              >
                <div className={`role-checkbox ${isChecked ? 'checked' : ''}`}>
                  {isChecked && <Check size={14} className="text-white" />}
                </div>
                <div className="role-text-wrap">
                  <div className="role-name">{role.label}</div>
                  <div className="role-desc">{role.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section: Portfolio & Notes */}
      <div className="form-section">
        <h4 className="section-label">4. Sample Work &amp; Notes (Optional)</h4>
        <div className="input-group mb-3">
          <label htmlFor="portfolioLink">Link to Question Paper Sample / LinkedIn / Drive</label>
          <div className="input-icon-wrap">
            <FileText size={16} className="input-icon" />
            <input
              id="portfolioLink"
              name="portfolioLink"
              type="url"
              placeholder="https://drive.google.com/... or linkedin.com/in/..."
              value={formData.portfolioLink}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="shortBio">Brief Bio or Board Highlights</label>
          <textarea
            id="shortBio"
            name="shortBio"
            rows={2}
            placeholder="Tell us about your teaching experience, notable school results, or key topics you love authoring..."
            value={formData.shortBio}
            onChange={handleChange}
            className="form-control textarea-control"
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <div className="form-submit-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-lg submit-btn shadow-hover"
        >
          {isSubmitting ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              <span>Verifying and Submitting...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Submit Educator Application</span>
              <ArrowRight size={17} />
            </>
          )}
        </button>
        <span className="submit-disclaimer">
          🔒 Your contact info is strictly confidential and used solely for academic onboarding.
        </span>
      </div>

      <style>{`
        .teacher-signup-form {
          background: #f2f5f0;
          border: 1.5px solid rgba(103, 192, 144, 0.4);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          box-shadow: 0 16px 40px -8px rgba(18, 65, 112, 0.1);
        }
        .is-modal-form {
          border: none;
          padding: 0;
          box-shadow: none;
        }

        .form-head {
          margin-bottom: 2rem;
          text-align: left;
        }
        .form-main-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }
        .form-sub-title {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 1.75rem;
          border-bottom: 1px solid var(--border-light);
        }
        .form-section:last-of-type {
          border-bottom: none;
          margin-bottom: 1.5rem;
          padding-bottom: 0;
        }

        .section-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: var(--pastel-lavender-text);
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        @media (max-width: 640px) {
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .input-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .input-icon-wrap {
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

        .form-control {
          width: 100%;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1.5px solid rgba(103, 192, 144, 0.4);
          background: #fbfdfc;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--text-main);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .input-icon-wrap .form-control {
          padding-left: 38px;
        }
        .form-control:focus {
          outline: none;
          border-color: rgb(18, 65, 112);
          box-shadow: 0 0 0 3px rgba(18, 65, 112, 0.15);
        }

        .select-control {
          appearance: auto;
          cursor: pointer;
        }

        .textarea-control {
          resize: vertical;
        }

        /* Evaluator radio group */
        .evaluator-flag-box {
          margin-top: 1.25rem;
          background: var(--bg-subtle);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
        }
        .evaluator-label {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-main);
          display: block;
          margin-bottom: 0.75rem;
        }
        .radio-group {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .radio-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: #fbfdfc;
          border: 1.5px solid rgba(103, 192, 144, 0.4);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .radio-pill input {
          margin: 0;
          cursor: pointer;
        }
        .radio-pill.selected {
          border-color: rgb(18, 65, 112);
          background: rgba(170, 255, 199, 0.35);
          color: rgb(18, 65, 112);
          font-weight: 600;
        }

        /* Roles Checklist */
        .roles-checklist {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .role-choice-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 14px;
          background: #fbfdfc;
          border: 1.5px solid rgba(103, 192, 144, 0.4);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .role-choice-card:hover {
          border-color: rgb(103, 192, 144);
          background: rgba(170, 255, 199, 0.15);
        }
        .role-choice-card.role-selected {
          border-color: rgb(18, 65, 112);
          background: rgba(170, 255, 199, 0.35);
        }

        .role-checkbox {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 1.5px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
          background: #f7faf5;
          flex-shrink: 0;
        }
        .role-checkbox.checked {
          background: var(--brand-emerald);
          border-color: var(--brand-emerald);
        }

        .role-text-wrap {
          display: flex;
          flex-direction: column;
        }
        .role-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-main);
        }
        .role-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* Submit row */
        .form-submit-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .submit-btn {
          width: 100%;
          justify-content: center;
          padding: 14px 24px;
          font-size: 1.05rem;
        }
        .submit-disclaimer {
          font-size: 0.8rem;
          color: var(--text-light);
          text-align: center;
        }
      `}</style>
    </form>
  );
}

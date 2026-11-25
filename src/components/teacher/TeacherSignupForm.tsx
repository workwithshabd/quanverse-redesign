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

export interface TeacherSignupFormProps {
  onSuccess?: (result: any) => void;
  isModal?: boolean;
}

export default function TeacherSignupForm({ onSuccess, isModal = false }: TeacherSignupFormProps) {
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

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);

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

  const handleRoleToggle = (roleId: string) => {
    setFormData(prev => {
      const exists = prev.roles.includes(roleId);
      if (exists) {
        return { ...prev, roles: prev.roles.filter(r => r !== roleId) };
      } else {
        return { ...prev, roles: [...prev.roles, roleId] };
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      <div className="bg-[#0c1c15] border border-[#276447]/50 rounded-2xl p-8 text-center shadow-xl">
        <div className="w-16 h-16 rounded-full bg-[#163a2a] text-[#43c98b] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="font-serif text-2xl font-bold text-white mb-2">Welcome to the Educator Network, {formData.fullName}!</h3>
        <p className="text-sm text-[#b5c0b8] max-w-lg mx-auto mb-6 leading-relaxed">
          Your credentials have been logged in our Academic Verification Queue.
          Our Chief Board Moderator will review your subject expertise and connect via WhatsApp/Email within <strong className="text-white">24 to 48 hours</strong>.
        </p>

        <div className="bg-[#07110d] border border-[#276447]/40 rounded-xl p-4 max-w-md mx-auto mb-6">
          <div className="text-[11px] uppercase tracking-wider text-[#748d78] font-bold mb-1">Your Application Reference ID</div>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-xl font-bold text-[#d5f36a] tracking-wider">{submitResult.applicationId}</span>
            <button
              type="button"
              className="btn btn-secondary btn-sm flex items-center gap-1 py-1 px-2.5 text-xs"
              onClick={handleCopyId}
            >
              {copied ? <Check size={14} className="text-[#43c98b]" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy ID'}</span>
            </button>
          </div>
        </div>

        <div className="text-left bg-[#07110d] border border-[#276447]/30 rounded-xl p-5 mb-6 max-w-lg mx-auto">
          <h4 className="text-sm font-bold text-white mb-3">What Happens Next:</h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 text-xs text-[#b5c0b8]">
              <div className="w-5 h-5 rounded-full bg-[#43c98b] text-[#07110d] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</div>
              <div><strong className="text-white">Syllabus Alignment Check:</strong> Our Senior Academic Lead verifies your CBSE/ICSE affiliation and sample question standards.</div>
            </div>
            <div className="flex items-start gap-3 text-xs text-[#b5c0b8]">
              <div className="w-5 h-5 rounded-full bg-[#43c98b] text-[#07110d] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</div>
              <div><strong className="text-white">15-Minute Authoring Walkthrough:</strong> You receive login credentials to our AI Question Authoring Studio &amp; Royalty Dashboard.</div>
            </div>
            <div className="flex items-start gap-3 text-xs text-[#b5c0b8]">
              <div className="w-5 h-5 rounded-full bg-[#43c98b] text-[#07110d] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</div>
              <div><strong className="text-white">First Payout Cycle:</strong> Begin authoring questions and earn royalties directly into your bank account.</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="btn btn-secondary flex items-center gap-2 py-2 px-5 text-xs"
            onClick={handleReset}
          >
            <RefreshCw size={15} />
            <span>Submit Another Application</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={`bg-[#0c1c15] border border-[#276447]/40 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 ${isModal ? 'shadow-none' : 'shadow-xl'}`} onSubmit={handleSubmit}>

      {/* Form Header */}
      <div className="border-b border-[#276447]/20 pb-4">
        <h3 className="font-serif text-2xl font-bold text-white">Sign Up as an Authoring Educator</h3>
        <p className="text-xs text-[#748d78] mt-1 leading-relaxed">
          Partner with Quanverse to author board-calibrated mock papers, review step-marking schemes, and earn monthly author royalties.
        </p>
      </div>

      {/* Grid: Personal Details */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs uppercase tracking-wider font-bold text-[#d5f36a]">1. Educator Information</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#b5c0b8]" htmlFor="fullName">Full Name &amp; Title *</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus-within:border-[#43c98b] transition-all">
              <User size={16} className="text-[#748d78] shrink-0" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="e.g. Dr. Ramesh Gupta"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-transparent text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#b5c0b8]" htmlFor="email">Email Address *</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus-within:border-[#43c98b] transition-all">
              <Mail size={16} className="text-[#748d78] shrink-0" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@school.edu.in"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#b5c0b8]" htmlFor="phone">Phone / WhatsApp Number *</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus-within:border-[#43c98b] transition-all">
              <Phone size={16} className="text-[#748d78] shrink-0" />
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#b5c0b8]" htmlFor="city">City &amp; State *</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus-within:border-[#43c98b] transition-all">
              <Building size={16} className="text-[#748d78] shrink-0" />
              <input
                id="city"
                name="city"
                type="text"
                required
                placeholder="e.g. New Delhi, NCR"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-transparent text-xs text-white outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Academic & Board Specialization */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs uppercase tracking-wider font-bold text-[#d5f36a]">2. Academic Background &amp; Subject</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="text-xs text-[#b5c0b8]" htmlFor="schoolName">Current / Past School or Institution *</label>
            <input
              id="schoolName"
              name="schoolName"
              type="text"
              required
              placeholder="e.g. Delhi Public School / DAV / Self-employed"
              value={formData.schoolName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus:border-[#43c98b] text-xs text-white outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#b5c0b8]" htmlFor="board">Primary Board Affiliation *</label>
            <select
              id="board"
              name="board"
              value={formData.board}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus:border-[#43c98b] text-xs text-white outline-none transition-all"
            >
              <option value="CBSE">CBSE (Central Board of Secondary Education)</option>
              <option value="ICSE">CISCE / ICSE (Indian Certificate of Secondary Education)</option>
              <option value="Both">Both CBSE &amp; ICSE</option>
              <option value="State">State Secondary Board</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#b5c0b8]" htmlFor="primarySubject">Class 10 Subject *</label>
            <select
              id="primarySubject"
              name="primarySubject"
              value={formData.primarySubject}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus:border-[#43c98b] text-xs text-white outline-none transition-all"
            >
              {subjectsList.map((sub, i) => (
                <option key={i} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="text-xs text-[#b5c0b8]" htmlFor="experienceYears">Class 10 Teaching Experience *</label>
            <select
              id="experienceYears"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus:border-[#43c98b] text-xs text-white outline-none transition-all"
            >
              <option value="3-5 years">3 to 5 years</option>
              <option value="5-8 years">5 to 8 years</option>
              <option value="8-15 years">8 to 15 years (Senior PGT/TGT)</option>
              <option value="15+ years">15+ years (Master Examiner / HOD)</option>
            </select>
          </div>
        </div>

        {/* Board Evaluator Radio */}
        <div className="mt-2 p-3.5 rounded-xl bg-[#07110d] border border-[#276447]/30 flex flex-col gap-2">
          <label className="text-xs text-[#b5c0b8]">
            Have you ever served as an official Board Answer Sheet Evaluator / Head Examiner?
          </label>
          <div className="flex gap-3">
            <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer text-xs transition-all ${formData.isBoardEvaluator === 'yes' ? 'bg-[#104734] border-[#d5f36a] text-white font-semibold' : 'bg-[#0c1c15] border-[#276447]/40 text-[#748d78]'}`}>
              <input
                type="radio"
                name="isBoardEvaluator"
                value="yes"
                checked={formData.isBoardEvaluator === 'yes'}
                onChange={handleChange}
                className="hidden"
              />
              <span>Yes, Official Board Evaluator</span>
            </label>
            <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer text-xs transition-all ${formData.isBoardEvaluator === 'no' ? 'bg-[#104734] border-[#d5f36a] text-white font-semibold' : 'bg-[#0c1c15] border-[#276447]/40 text-[#748d78]'}`}>
              <input
                type="radio"
                name="isBoardEvaluator"
                value="no"
                checked={formData.isBoardEvaluator === 'no'}
                onChange={handleChange}
                className="hidden"
              />
              <span>No, School Teacher / Tutor</span>
            </label>
          </div>
        </div>
      </div>

      {/* Section: Roles Interested In */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs uppercase tracking-wider font-bold text-[#d5f36a]">3. How Would You Like to Collaborate?</h4>
        <div className="flex flex-col gap-2">
          {roleOptions.map((role) => {
            const isChecked = formData.roles.includes(role.id);
            return (
              <div
                key={role.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isChecked ? 'bg-[#104734]/60 border-[#d5f36a]' : 'bg-[#07110d] border-[#276447]/30 hover:border-[#43c98b]/50'}`}
                onClick={() => handleRoleToggle(role.id)}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${isChecked ? 'bg-[#43c98b] border-[#43c98b]' : 'border-[#276447]/50'}`}>
                  {isChecked && <Check size={12} className="text-[#07110d]" />}
                </div>
                <div className="flex flex-col">
                  <div className="text-xs font-bold text-white">{role.label}</div>
                  <div className="text-[11px] text-[#748d78] mt-0.5">{role.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section: Portfolio & Notes */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs uppercase tracking-wider font-bold text-[#d5f36a]">4. Sample Work &amp; Notes (Optional)</h4>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#b5c0b8]" htmlFor="portfolioLink">Link to Question Paper Sample / LinkedIn / Drive</label>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus-within:border-[#43c98b] transition-all">
            <FileText size={16} className="text-[#748d78] shrink-0" />
            <input
              id="portfolioLink"
              name="portfolioLink"
              type="url"
              placeholder="https://drive.google.com/..."
              value={formData.portfolioLink}
              onChange={handleChange}
              className="w-full bg-transparent text-xs text-white outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#b5c0b8]" htmlFor="shortBio">Brief Bio or Board Highlights</label>
          <textarea
            id="shortBio"
            name="shortBio"
            rows={2}
            placeholder="Tell us about your teaching experience or notable school results..."
            value={formData.shortBio}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#07110d] border border-[#276447]/40 focus:border-[#43c98b] text-xs text-white outline-none resize-vertical transition-all"
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex flex-col items-center gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full py-3.5 px-6 flex items-center justify-center gap-2 cursor-pointer text-sm font-bold"
        >
          <span className="button__flair" aria-hidden="true" />
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
        <span className="text-[11px] text-[#748d78]">
          🔒 Your contact info is strictly confidential and used solely for academic onboarding.
        </span>
      </div>

    </form>
  );
}

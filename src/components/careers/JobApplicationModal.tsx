import React, { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle2, ArrowRight, RefreshCw, Mail, Phone, User, Link as LinkIcon, Send } from 'lucide-react';
import { api } from '../../services/api';

export interface JobItem {
  id?: string;
  title?: string;
  department?: string;
  location?: string;
  type?: string;
  [key: string]: any;
}

export interface JobApplicationModalProps {
  isOpen: boolean;
  job?: JobItem | null;
  onClose: () => void;
}

export default function JobApplicationModal({ isOpen, job, onClose }: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    portfolioUrl: '',
    resumeLink: '',
    note: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const handleClose = useCallback(() => {
    setResult(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4 bg-[#07110d]/80 backdrop-blur-md" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="relative w-full max-w-[560px] max-h-[90vh] bg-[#0c1c15] border border-[#276447]/50 rounded-2xl shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className="absolute top-4 right-4 text-[#748d78] hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
          onClick={handleClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          {result ? (
            <div className="text-center flex flex-col items-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#163a2a] text-[#43c98b] flex items-center justify-center mb-3">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Thank You, {formData.fullName}!</h3>
              <p className="text-sm text-[#b5c0b8] mb-4">
                Your application for <strong className="text-white">{job?.title || 'this role'}</strong> has been submitted directly to our Talent &amp; Hiring team.
              </p>
              <div className="bg-[#07110d] border border-[#276447]/40 px-3.5 py-1.5 rounded-md font-mono text-xs text-[#d5f36a] mb-4">
                <span>Application ID: <strong>{result.applicationId}</strong></span>
              </div>
              <p className="text-[#748d78] text-xs mb-6 max-w-md">
                We review applications weekly. If your background aligns with our engineering &amp; product roadmap, our team will schedule a 30-minute introductory call.
              </p>
              <button
                type="button"
                className="btn btn-primary px-6 py-2"
                onClick={handleClose}
              >
                <span>Done</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="border-b border-[#276447]/20 pb-3 pr-8">
                <h3 className="text-lg font-bold text-white">Apply for {job?.title || 'Open Position'}</h3>
                <p className="text-xs text-[#748d78] mt-0.5">
                  Location: <strong className="text-[#b5c0b8]">{job?.location || 'Remote'}</strong> • Type: <strong className="text-[#b5c0b8]">{job?.type || 'Full-time'}</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs text-[#b5c0b8]" htmlFor="jobFullName">Full Name *</label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus-within:border-[#43c98b] transition-all">
                    <User size={15} className="text-[#748d78] shrink-0" />
                    <input
                      id="jobFullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-transparent text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#b5c0b8]" htmlFor="jobEmail">Email Address *</label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus-within:border-[#43c98b] transition-all">
                    <Mail size={15} className="text-[#748d78] shrink-0" />
                    <input
                      id="jobEmail"
                      name="email"
                      type="email"
                      required
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#b5c0b8]" htmlFor="jobPhone">Phone Number *</label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus-within:border-[#43c98b] transition-all">
                    <Phone size={15} className="text-[#748d78] shrink-0" />
                    <input
                      id="jobPhone"
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

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs text-[#b5c0b8]" htmlFor="jobResume">Resume / CV Link *</label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus-within:border-[#43c98b] transition-all">
                    <LinkIcon size={15} className="text-[#748d78] shrink-0" />
                    <input
                      id="jobResume"
                      name="resumeLink"
                      type="url"
                      required
                      placeholder="https://drive.google.com/... or dropbox"
                      value={formData.resumeLink}
                      onChange={handleChange}
                      className="w-full bg-transparent text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#b5c0b8]" htmlFor="jobLinkedin">LinkedIn / GitHub Profile</label>
                  <input
                    id="jobLinkedin"
                    name="linkedinUrl"
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus:border-[#43c98b] text-xs text-white outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#b5c0b8]" htmlFor="jobPortfolio">Portfolio / Work Sample URL</label>
                  <input
                    id="jobPortfolio"
                    name="portfolioUrl"
                    type="url"
                    placeholder="https://mywork.dev"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-[#07110d] border border-[#276447]/40 focus:border-[#43c98b] text-xs text-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-1">
                <label className="text-xs text-[#b5c0b8]" htmlFor="jobNote">Why Quanverse? (Brief Cover Note)</label>
                <textarea
                  id="jobNote"
                  name="note"
                  rows={3}
                  placeholder="Tell us what excites you about transforming secondary board exams..."
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#07110d] border border-[#276447]/40 focus:border-[#43c98b] text-xs text-white outline-none resize-vertical transition-all"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full py-3 px-5 flex items-center justify-center gap-2 cursor-pointer"
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
    </div>
  );
}

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import TeacherSignupForm from './TeacherSignupForm';

export interface TeacherSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TeacherSignupModal({ isOpen, onClose }: TeacherSignupModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#07110d]/80 backdrop-blur-md" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="relative w-full max-w-[760px] max-h-[90vh] bg-[#0c1c15] border border-[#276447]/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#07110d] border border-[#276447]/40 flex items-center justify-center text-[#748d78] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <TeacherSignupForm onSuccess={() => { }} isModal={true} />
        </div>
      </div>
    </div>
  );
}

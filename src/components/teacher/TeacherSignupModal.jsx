import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import TeacherSignupForm from './TeacherSignupForm';


export default function TeacherSignupModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
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
    <div className="teacher-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="teacher-modal-dialog glass-panel-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button" 
          className="modal-close-icon-btn" 
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="modal-content-scroller">
          <TeacherSignupForm onSuccess={() => {}} isModal={true} />
        </div>
      </div>

      <style>{`
        .teacher-modal-backdrop {
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

        .teacher-modal-dialog {
          position: relative;
          background: #f2f5f0;
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 760px;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 25px 60px -15px rgba(18, 65, 112, 0.2);
          border: 1.5px solid rgba(103, 192, 144, 0.4);
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-close-icon-btn {
          position: absolute;
          top: 20px;
          right: 20px;
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
          z-index: 10;
          transition: all var(--transition-fast);
        }
        .modal-close-icon-btn:hover {
          background: #f0f0f0;
          color: var(--text-main);
          transform: rotate(90deg);
        }

        .modal-content-scroller {
          overflow-y: auto;
          padding: 2.5rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.98); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
      `}</style>
    </div>
  );
}

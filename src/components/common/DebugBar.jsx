import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { Terminal, Users, GraduationCap, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';


export default function DebugBar() {
  const { 
    currentPage, 
    navigateTo, 
    openTeacherSignup, 
    openDemoExam 
  } = useNavigation();

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Shortcut Ctrl+Shift+D to toggle debug bar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        setIsVisible(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <aside className="dev-debug-hud" aria-label="Developer Debug HUD">
      {isOpen ? (
        <div className="debug-expanded-panel">
          <div className="debug-header">
            <div className="debug-title-row">
              <Terminal size={14} className="text-emerald" />
              <span className="debug-title">Quanverse Dev HUD</span>
              <span className="debug-env-tag">DEBUG MODE</span>
            </div>
            <button 
              type="button" 
              className="debug-icon-btn" 
              onClick={() => setIsOpen(false)}
              title="Minimize HUD"
            >
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="debug-body">
            <div className="debug-stat-row">
              <span className="debug-label">Active Route:</span>
              <span className={`debug-badge ${currentPage === 'home' ? 'badge-student' : 'badge-teacher'}`}>
                {currentPage === 'home' ? 'Student Landing (/)' : 'Careers & Teachers (/#careers)'}
              </span>
            </div>

            <div className="debug-controls-group">
              <span className="debug-section-title">Quick View Switcher:</span>
              <div className="debug-buttons-row">
                <button
                  type="button"
                  className={`debug-btn ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => navigateTo('home')}
                >
                  <GraduationCap size={13} />
                  <span>Student Landing</span>
                </button>
                <button
                  type="button"
                  className={`debug-btn ${currentPage === 'careers' ? 'active' : ''}`}
                  onClick={() => navigateTo('careers')}
                >
                  <Users size={13} />
                  <span>Careers / Teachers</span>
                </button>
              </div>
            </div>

            <div className="debug-controls-group">
              <span className="debug-section-title">Trigger Modals:</span>
              <div className="debug-buttons-row">
                <button
                  type="button"
                  className="debug-btn debug-btn-accent"
                  onClick={openTeacherSignup}
                >
                  <Users size={13} />
                  <span>Teacher Sign-Up Modal</span>
                </button>
                <button
                  type="button"
                  className="debug-btn"
                  onClick={openDemoExam}
                >
                  <Sparkles size={13} />
                  <span>Demo Exam Modal</span>
                </button>
              </div>
            </div>

            <div className="debug-footnote">
              Tip: Press <kbd>Ctrl+Shift+D</kbd> to toggle HUD
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="debug-pill-trigger"
          onClick={() => setIsOpen(true)}
          title="Open Developer HUD (Ctrl+Shift+D)"
        >
          <Terminal size={14} className="text-emerald" />
          <span className="debug-pill-text">
            {currentPage === 'home' ? 'Student View' : 'Careers View'}
          </span>
          <ChevronUp size={13} />
        </button>
      )}

      <style>{`
        .dev-debug-hud {
          position: fixed;
          bottom: 18px;
          right: 18px;
          z-index: 99999;
          font-family: var(--font-sans);
          font-size: 12px;
        }

        .debug-pill-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: #142a21;
          color: #e2f1e7;
          border: 1px solid rgba(184, 224, 199, 0.3);
          border-radius: var(--radius-full);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .debug-pill-trigger:hover {
          transform: translateY(-2px);
          background: #1e3f31;
        }
        .debug-pill-text {
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        .debug-expanded-panel {
          width: 300px;
          background: #142a21;
          color: #f4f6f4;
          border: 1px solid rgba(184, 224, 199, 0.25);
          border-radius: var(--radius-md);
          box-shadow: 0 12px 36px rgba(0,0,0,0.3);
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .debug-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .debug-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .debug-title {
          font-weight: 700;
          font-size: 12px;
          color: #ffffff;
        }

        .debug-env-tag {
          font-size: 9px;
          padding: 2px 5px;
          background: rgba(45, 106, 79, 0.6);
          color: #a3e635;
          border-radius: 4px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .debug-icon-btn {
          background: transparent;
          border: none;
          color: #82988d;
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }
        .debug-icon-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .debug-body {
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .debug-stat-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .debug-label {
          color: #82988d;
          font-size: 11px;
        }

        .debug-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .badge-student {
          background: rgba(226, 241, 231, 0.2);
          color: #b8e0c7;
        }
        .badge-teacher {
          background: rgba(238, 234, 253, 0.2);
          color: #d4ccfc;
        }

        .debug-controls-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .debug-section-title {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #82988d;
          font-weight: 600;
        }

        .debug-buttons-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .debug-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 6px 10px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: #e2f1e7;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .debug-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        .debug-btn.active {
          background: var(--brand-emerald-light);
          border-color: #b8e0c7;
          color: #ffffff;
        }
        .debug-btn-accent {
          background: rgba(76, 63, 181, 0.35);
          border-color: rgba(212, 204, 252, 0.4);
          color: #eeeafd;
        }
        .debug-btn-accent:hover {
          background: rgba(76, 63, 181, 0.55);
        }

        .debug-footnote {
          font-size: 10px;
          color: #576d61;
          text-align: center;
          margin-top: 2px;
        }
        .debug-footnote kbd {
          background: rgba(255, 255, 255, 0.1);
          padding: 1px 4px;
          border-radius: 3px;
          color: #b8e0c7;
        }
      `}</style>
    </aside>
  );
}

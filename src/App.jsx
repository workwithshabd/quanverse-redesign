import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuickExamModal from './components/QuickExamModal';
import TeacherSignupModal from './components/teacher/TeacherSignupModal';
import JobApplicationModal from './components/careers/JobApplicationModal';
import GoogleAuthModal from './components/auth/GoogleAuthModal';
import SignInModal from './components/auth/SignInModal';
import StudentLandingPage from './pages/StudentLandingPage';
import CareersPage from './pages/CareersPage';
import TeachersPage from './pages/TeachersPage';
import SignInPage from './pages/SignInPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import ArtisticGraffitiBackground from './components/common/ArtisticGraffitiBackground';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NavigationProvider } from './context/NavigationContext';
import { useNavigation } from './hooks/useNavigation';
import { useAuth } from './hooks/useAuth';
import { X, CheckCircle, Info } from 'lucide-react';

function AppContent() {
  const {
    currentPage,
    authInitialTab,
    isSignInModalOpen,
    closeSignInModal,
    isDemoExamOpen,
    closeDemoExam,
    isTeacherSignupModalOpen,
    closeTeacherSignup,
    isJobModalOpen,
    selectedJob,
    closeJobApplication
  } = useNavigation();

  const {
    isGoogleModalOpen,
    googleAuthMode,
    closeGoogleAuth,
    toastNotification,
    clearToast
  } = useAuth();

  return (
    <div className="quanverse-app-wrapper">
      {/* 1. Dedicated Fixed Full-Screen Green Gradient Background Layer */}
      <div className="fixed-green-bg" aria-hidden="true">
        <div className="fixed-green-bg-gradient" />
        <div className="fixed-green-bg-radial" />
        <div className="fixed-green-bg-mesh" />
      </div>

      {/* 2. Scrolling Content Layer (Preserves Normal Document Flow) */}
      <div className="scrolling-content-layer">
        {/* Dedicated Full-Page Document-Height Scattered Graffiti Calligraphy Artwork Layer */}
        <ArtisticGraffitiBackground />

        {/* Universal Responsive Navigation Bar */}
        <Navbar />

        {/* Centered Main Architectural Shell with Continuous Dotted Vertical Borders */}
        <div className="zuse-main-frame">

          {/* Main View: Student Landing (Default), Company Careers, Educator Portal, OR Sign In/Account Page */}
          <main id="main-content">
            {currentPage === 'home' && <StudentLandingPage />}
            {currentPage === 'careers' && <CareersPage />}
            {currentPage === 'teachers' && <TeachersPage />}
            {currentPage === 'signin' && <SignInPage initialTab={authInitialTab} />}
          </main>

          {/* Universal Footer */}
          <Footer />
        </div>
      </div>

      {/* 3. Progressive Bottom-Edge Blur Overlay (Seamless Atmospheric Dissolve, No Visible Lines) */}
      <div className="bottom-edge-blur" aria-hidden="true">
        <div className="blur-layer blur-layer-base" />
        <div className="blur-layer blur-layer-deep" />
        <div className="blur-layer-tint" />
      </div>

      {/* Interactive Sign In & Create Account Modal */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={closeSignInModal}
        initialTab={authInitialTab}
      />

      {/* Student Quick Demo Exam Modal */}
      <QuickExamModal
        isOpen={isDemoExamOpen}
        onClose={closeDemoExam}
      />

      {/* Dedicated Teacher Sign-Up & Educator Application Modal */}
      <TeacherSignupModal
        isOpen={isTeacherSignupModalOpen}
        onClose={closeTeacherSignup}
      />

      {/* General Job Role Application Modal */}
      <JobApplicationModal
        isOpen={isJobModalOpen}
        job={selectedJob}
        onClose={closeJobApplication}
      />

      {/* Universal Google Identity Auth Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        mode={googleAuthMode}
        onClose={closeGoogleAuth}
      />

      {/* Global Auth Status Toast (Instant Feedback on Sign In / Sign Out) */}
      {toastNotification && (
        <div className={`auth-global-toast toast-${toastNotification.type}`} role="status">
          <div className="toast-icon">
            {toastNotification.type === 'success' ? (
              <CheckCircle size={16} className="text-emerald" />
            ) : (
              <Info size={16} className="text-teal" />
            )}
          </div>
          <span className="toast-text">{toastNotification.message}</span>
          <button
            type="button"
            onClick={clearToast}
            className="toast-close"
            aria-label="Dismiss message"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Global Auth Feedback Toast */}


      <style>{`
        .quanverse-app-wrapper {
          min-height: 100dvh;
          position: relative;
        }

        .scrolling-content-layer {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
        }

        #main-content {
          flex: 1;
        }

        /* Global Auth Feedback Toast */
        .auth-global-toast {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999999;
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.75rem 1.15rem;
          background: #0f172a;
          color: #f8fafc;
          border-radius: 9999px;
          border: 1px solid rgba(103, 192, 144, 0.4);
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.35), 0 0 15px rgba(103, 192, 144, 0.2);
          animation: toastPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 600;
        }

        [data-theme="dark"] .auth-global-toast {
          background: #121820;
          border-color: rgba(170, 255, 199, 0.45);
          color: #ffffff;
        }

        @keyframes toastPop {
          from {
            opacity: 0;
            transform: translate(-50%, 15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
        }

        .toast-icon {
          display: flex;
          align-items: center;
        }

        .toast-text {
          white-space: nowrap;
        }

        .toast-close {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: color 0.15s;
        }
        .toast-close:hover {
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <NavigationProvider>
            <AppContent />
          </NavigationProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

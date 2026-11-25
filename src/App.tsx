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
import { useButtonFlair } from './hooks/useButtonFlair';
import { X, CheckCircle, Info } from 'lucide-react';

function AppContent() {
  // Global cursor-following circular GSAP hover effect across all eligible buttons
  useButtonFlair();

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
    <div className="quanverse-app-wrapper min-h-[100dvh] relative">
      {/* 1. Dedicated Fixed Full-Screen Green Gradient Background Layer */}
      <div className="fixed-green-bg" aria-hidden="true">
        <div className="fixed-green-bg-gradient" />
        <div className="fixed-green-bg-radial" />
        <div className="fixed-green-bg-mesh" />
      </div>

      {/* 2. Scrolling Content Layer (Preserves Normal Document Flow) */}
      <div className="scrolling-content-layer relative z-[1] w-full min-h-[100dvh] flex flex-col">
        {/* Dedicated Full-Page Document-Height Scattered Graffiti Calligraphy Artwork Layer */}
        <ArtisticGraffitiBackground />

        {/* Universal Responsive Navigation Bar */}
        <Navbar />

        {/* Centered Main Architectural Shell with Continuous Dotted Vertical Borders */}
        <div className="zuse-main-frame">

          {/* Main View: Student Landing (Default), Company Careers, Educator Portal, OR Sign In/Account Page */}
          <main id="main-content" className="flex-1">
            {currentPage === 'home' && <StudentLandingPage />}
            {currentPage === 'careers' && <CareersPage />}
            {currentPage === 'teachers' && <TeachersPage />}
            {currentPage === 'signin' && <SignInPage initialTab={authInitialTab as 'signin' | 'signup'} />}
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
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999999] inline-flex items-center gap-2.5 px-4 py-3 bg-[#0f172a] text-[#f8fafc] rounded-full border border-[#43C98B]/40 shadow-2xl text-sm font-semibold transition-transform"
          role="status"
        >
          <div className="flex items-center shrink-0">
            {toastNotification.type === 'success' ? (
              <CheckCircle size={16} className="text-[#43C98B]" />
            ) : (
              <Info size={16} className="text-[#D5F36A]" />
            )}
          </div>
          <span className="whitespace-nowrap">{toastNotification.message}</span>
          <button
            type="button"
            onClick={clearToast}
            className="p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss message"
          >
            <X size={14} />
          </button>
        </div>
      )}
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

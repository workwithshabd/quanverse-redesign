import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuickExamModal from './components/QuickExamModal';
import TeacherSignupModal from './components/teacher/TeacherSignupModal';
import JobApplicationModal from './components/careers/JobApplicationModal';
import StudentLandingPage from './pages/StudentLandingPage';
import CareersPage from './pages/CareersPage';
import TeachersPage from './pages/TeachersPage';
import DebugBar from './components/common/DebugBar';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { NavigationProvider } from './context/NavigationContext';
import { useNavigation } from './hooks/useNavigation';

function AppContent() {
  const { 
    currentPage, 
    isDemoExamOpen, 
    closeDemoExam, 
    isTeacherSignupModalOpen, 
    closeTeacherSignup,
    isJobModalOpen,
    selectedJob,
    closeJobApplication
  } = useNavigation();

  return (
    <div className="quanverse-app-wrapper">
      {/* Universal Responsive Navigation Bar */}
      <Navbar />

      {/* Main View: Student Landing (Default), Company Careers, OR Educator Portal */}
      <main id="main-content">
        {currentPage === 'home' && <StudentLandingPage />}
        {currentPage === 'careers' && <CareersPage />}
        {currentPage === 'teachers' && <TeachersPage />}
      </main>

      {/* Universal Footer */}
      <Footer />

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

      {/* Developer HUD: Debug bar for easy view switching and state inspection */}
      <DebugBar />

      <style>{`
        .quanverse-app-wrapper {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
        }

        #main-content {
          flex: 1;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ErrorBoundary>
  );
}

import React, { useState, useEffect } from 'react';
import { logger } from '../services/logger';
import { NavigationContext } from './navigationContextDefinition';

export function NavigationProvider({ children }) {
  // Current page view: 'home' | 'careers' | 'teachers'
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.startsWith('#teachers') || hash.startsWith('#teacher-signup') || hash.startsWith('#for-teachers')) {
      return 'teachers';
    }
    if (hash.startsWith('#careers') || hash.startsWith('#jobs') || hash.startsWith('#open-roles')) {
      return 'careers';
    }
    return 'home';
  });

  // Modal states
  const [isDemoExamOpen, setIsDemoExamOpen] = useState(false);
  const [isTeacherSignupModalOpen, setIsTeacherSignupModalOpen] = useState(() => {
    return window.location.hash.toLowerCase().includes('teacher-signup');
  });

  // General Job Application Modal state
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  // Listen to hash changes (for browser back/forward or direct links like #careers, #teachers)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      logger.nav(`Hash changed to: ${hash}`);

      if (hash.startsWith('#teachers') || hash.startsWith('#for-teachers')) {
        setCurrentPage('teachers');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#teacher-signup')) {
        setCurrentPage('teachers');
        setIsTeacherSignupModalOpen(true);
      } else if (hash.startsWith('#careers') || hash.startsWith('#jobs') || hash.startsWith('#open-roles')) {
        setCurrentPage('careers');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#mock-demo') || hash.startsWith('#demo-exam')) {
        setIsDemoExamOpen(true);
      } else if (hash === '' || hash === '#' || hash.startsWith('#home')) {
        setCurrentPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page, targetHash = '') => {
    logger.nav(`Navigating to page [${page}], targetHash [${targetHash}]`);
    setCurrentPage(page);

    if (page === 'careers') {
      window.location.hash = targetHash || 'careers';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'teachers') {
      window.location.hash = targetHash || 'teachers';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (targetHash) {
        window.location.hash = targetHash;
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const openTeacherSignup = () => {
    logger.teacher('Opening Teacher Signup Modal');
    setIsTeacherSignupModalOpen(true);
  };

  const closeTeacherSignup = () => {
    setIsTeacherSignupModalOpen(false);
  };

  const openDemoExam = () => {
    logger.exam('Opening Quick Demo Exam Modal');
    setIsDemoExamOpen(true);
  };

  const closeDemoExam = () => {
    setIsDemoExamOpen(false);
  };

  const openJobApplication = (job) => {
    logger.api(`Opening job application for: ${job?.title || 'General role'}`);
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  const closeJobApplication = () => {
    setIsJobModalOpen(false);
    setSelectedJob(null);
  };

  const value = {
    currentPage,
    navigateTo,
    isDemoExamOpen,
    openDemoExam,
    closeDemoExam,
    isTeacherSignupModalOpen,
    openTeacherSignup,
    closeTeacherSignup,
    isJobModalOpen,
    selectedJob,
    openJobApplication,
    closeJobApplication
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

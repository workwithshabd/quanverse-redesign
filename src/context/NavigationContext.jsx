import React, { useState, useEffect } from 'react';
import { logger } from '../services/logger';
import { NavigationContext } from './navigationContextDefinition';

export function NavigationProvider({ children }) {
  // Current page view: 'home' | 'careers'
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.startsWith('#careers') || hash.startsWith('#teacher-signup') || hash.startsWith('#for-teachers')) {
      return 'careers';
    }
    return 'home';
  });

  // Modal states
  const [isDemoExamOpen, setIsDemoExamOpen] = useState(false);
  const [isTeacherSignupModalOpen, setIsTeacherSignupModalOpen] = useState(() => {
    return window.location.hash.toLowerCase().includes('teacher-signup');
  });

  // Listen to hash changes (for browser back/forward or direct links like #careers)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      logger.nav(`Hash changed to: ${hash}`);

      if (hash.startsWith('#careers') || hash.startsWith('#for-teachers')) {
        setCurrentPage('careers');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#teacher-signup')) {
        setCurrentPage('careers');
        setIsTeacherSignupModalOpen(true);
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
    } else {
      if (targetHash) {
        window.location.hash = targetHash;
        // Allow DOM to settle then scroll
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

  const value = {
    currentPage,
    navigateTo,
    isDemoExamOpen,
    openDemoExam,
    closeDemoExam,
    isTeacherSignupModalOpen,
    openTeacherSignup,
    closeTeacherSignup
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}



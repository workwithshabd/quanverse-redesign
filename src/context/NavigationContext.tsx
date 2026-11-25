import React, { useState, useEffect } from 'react';
import { logger } from '../services/logger';
import { NavigationContext, NavigationContextType } from './navigationContextDefinition';

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  // Current page view: 'home' | 'careers' | 'teachers' | 'signin'
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.startsWith('#teachers') || hash.startsWith('#teacher-signup') || hash.startsWith('#for-teachers')) {
      return 'teachers';
    }
    if (hash.startsWith('#careers') || hash.startsWith('#jobs') || hash.startsWith('#open-roles')) {
      return 'careers';
    }
    if (hash.startsWith('#signin') || hash.startsWith('#login') || hash.startsWith('#signup') || hash.startsWith('#register') || hash.startsWith('#create-account')) {
      return 'signin';
    }
    return 'home';
  });

  const [authInitialTab, setAuthInitialTab] = useState<string>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.startsWith('#signup') || hash.startsWith('#register') || hash.startsWith('#create-account')) {
      return 'signup';
    }
    return 'signin';
  });

  // Modal states
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
  const [isDemoExamOpen, setIsDemoExamOpen] = useState<boolean>(false);
  const [isTeacherSignupModalOpen, setIsTeacherSignupModalOpen] = useState<boolean>(() => {
    return window.location.hash.toLowerCase().includes('teacher-signup');
  });

  // General Job Application Modal state
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState<boolean>(false);

  // Listen to hash changes (for browser back/forward or direct links like #careers, #teachers, #signin)
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
      } else if (hash.startsWith('#signin') || hash.startsWith('#login')) {
        setCurrentPage('signin');
        setAuthInitialTab('signin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#signup') || hash.startsWith('#register') || hash.startsWith('#create-account')) {
        setCurrentPage('signin');
        setAuthInitialTab('signup');
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

  const navigateTo = (page: string, targetHash: string = '') => {
    logger.nav(`Navigating to page [${page}], targetHash [${targetHash}]`);
    setCurrentPage(page);

    if (page === 'careers') {
      window.location.hash = targetHash || 'careers';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'teachers') {
      window.location.hash = targetHash || 'teachers';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'signin') {
      window.location.hash = targetHash || 'signin';
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

  const openSignInModal = (tab: string = 'signin') => {
    logger.auth(`Opening sign in modal with tab: ${tab}`);
    setAuthInitialTab(tab);
    setIsSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const openSignIn = (tab: string = 'signin') => {
    logger.auth(`Navigating to Sign In page with initialTab: ${tab}`);
    setAuthInitialTab(tab);
    setIsSignInModalOpen(false);
    navigateTo('signin');
  };

  const openSignUp = () => {
    logger.auth('Navigating to Create Account page');
    setAuthInitialTab('signup');
    setIsSignInModalOpen(false);
    navigateTo('signin');
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

  const openJobApplication = (job: any) => {
    logger.api(`Opening job application for: ${job?.title || 'General role'}`);
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  const closeJobApplication = () => {
    setIsJobModalOpen(false);
    setSelectedJob(null);
  };

  const value: NavigationContextType = {
    currentPage,
    authInitialTab,
    isSignInModalOpen,
    openSignInModal,
    closeSignInModal,
    navigateTo,
    openSignIn,
    openSignUp,
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

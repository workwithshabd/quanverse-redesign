import { createContext } from 'react';

export interface NavigationContextType {
  currentPage: string;
  authInitialTab: string;
  isSignInModalOpen: boolean;
  openSignInModal: (tab?: string) => void;
  closeSignInModal: () => void;
  navigateTo: (page: string, targetHash?: string) => void;
  openSignIn: (tab?: string) => void;
  openSignUp: () => void;
  isDemoExamOpen: boolean;
  openDemoExam: () => void;
  closeDemoExam: () => void;
  isTeacherSignupModalOpen: boolean;
  openTeacherSignup: () => void;
  closeTeacherSignup: () => void;
  isJobModalOpen: boolean;
  selectedJob: any;
  openJobApplication: (job: any) => void;
  closeJobApplication: () => void;
}

export const NavigationContext = createContext<NavigationContextType | null>(null);

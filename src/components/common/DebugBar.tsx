import { useState, useEffect } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { useAuth } from '../../hooks/useAuth';
import { Terminal, Users, GraduationCap, Sparkles, ChevronDown, ChevronUp, Briefcase, LogIn, LogOut } from 'lucide-react';

export default function DebugBar() {
  const { 
    currentPage, 
    navigateTo, 
    openTeacherSignup, 
    openDemoExam,
    openSignIn
  } = useNavigation();

  const {
    user,
    isAuthenticated,
    signOut,
    quickDemoLogin
  } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Shortcut Ctrl+Shift+D to toggle debug bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        setIsVisible(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <aside className="fixed bottom-[18px] right-[18px] z-[99999] font-sans text-xs" aria-label="Developer Debug HUD">
      {isOpen ? (
        <div className="w-[300px] bg-[#142a21] text-[#f4f6f4] border border-[#b8e0c7]/25 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-white/5 border-b border-white/[0.08]">
            <div className="flex items-center gap-1.5">
              <Terminal size={14} className="text-emerald-400" />
              <span className="font-bold text-xs text-white">Quanverse Dev HUD</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#2d6a4f]/60 text-lime-400 rounded font-bold tracking-wider">DEBUG MODE</span>
            </div>
            <button 
              type="button" 
              className="bg-transparent border-0 text-[#82988d] hover:text-white hover:bg-white/10 p-0.5 flex items-center justify-center rounded cursor-pointer transition-colors" 
              onClick={() => setIsOpen(false)}
              title="Minimize HUD"
            >
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="p-3.5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[#82988d] text-[11px]">Active Route:</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#e2f1e7]/20 text-[#b8e0c7]">
                {currentPage === 'home' && 'Student Landing (/)'}
                {currentPage === 'careers' && 'Company Careers (/#careers)'}
                {currentPage === 'teachers' && 'Educator Portal (/#teachers)'}
                {currentPage === 'signin' && 'Sign In / Account (/#signin)'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#82988d] text-[11px]">Auth State:</span>
              {isAuthenticated && user ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500 text-white">
                    Signed In: {user.name ? user.name.split(' ')[0] : 'User'}
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-[11px] text-red-500 border border-red-500/40 px-2 py-0.5 rounded hover:bg-red-500/10 cursor-pointer transition-colors"
                    onClick={() => signOut()}
                    title="Sign Out of student account"
                  >
                    <LogOut size={11} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white/10 text-white/80">Logged Out</span>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-[11px] bg-[#4c3fb1]/35 border border-[#d4ccfc]/40 text-[#eeeafd] hover:bg-[#4c3fb1]/55 px-2 py-0.5 rounded cursor-pointer transition-colors"
                    onClick={() => quickDemoLogin()}
                    title="Quick Demo Student Login"
                  >
                    <Sparkles size={11} />
                    <span>1-Click Demo</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#82988d] font-semibold">Quick View Switcher:</span>
              <div className="flex gap-1.5 flex-wrap">
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-md text-[11px] font-medium border cursor-pointer transition-all ${currentPage === 'home' ? 'bg-emerald-600 border-[#b8e0c7] text-white' : 'bg-white/[0.08] border-white/10 text-[#e2f1e7] hover:bg-white/[0.15]'}`}
                  onClick={() => navigateTo('home')}
                >
                  <GraduationCap size={13} />
                  <span>Student</span>
                </button>
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-md text-[11px] font-medium border cursor-pointer transition-all ${currentPage === 'careers' ? 'bg-emerald-600 border-[#b8e0c7] text-white' : 'bg-white/[0.08] border-white/10 text-[#e2f1e7] hover:bg-white/[0.15]'}`}
                  onClick={() => navigateTo('careers')}
                >
                  <Briefcase size={13} />
                  <span>Careers</span>
                </button>
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-md text-[11px] font-medium border cursor-pointer transition-all ${currentPage === 'teachers' ? 'bg-emerald-600 border-[#b8e0c7] text-white' : 'bg-white/[0.08] border-white/10 text-[#e2f1e7] hover:bg-white/[0.15]'}`}
                  onClick={() => navigateTo('teachers')}
                >
                  <Users size={13} />
                  <span>Teachers</span>
                </button>
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-md text-[11px] font-medium border cursor-pointer transition-all ${currentPage === 'signin' ? 'bg-emerald-600 border-[#b8e0c7] text-white' : 'bg-white/[0.08] border-white/10 text-[#e2f1e7] hover:bg-white/[0.15]'}`}
                  onClick={() => openSignIn('signin')}
                >
                  <LogIn size={13} />
                  <span>Sign In</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#82988d] font-semibold">Trigger Modals:</span>
              <div className="flex gap-1.5 flex-wrap">
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-md text-[11px] font-medium border bg-[#4c3fb1]/35 border-[#d4ccfc]/40 text-[#eeeafd] hover:bg-[#4c3fb1]/55 cursor-pointer transition-colors"
                  onClick={openTeacherSignup}
                >
                  <Users size={13} />
                  <span>Teacher Sign-Up Modal</span>
                </button>
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-md text-[11px] font-medium border bg-white/[0.08] border-white/10 text-[#e2f1e7] hover:bg-white/[0.15] cursor-pointer transition-colors"
                  onClick={openDemoExam}
                >
                  <Sparkles size={13} />
                  <span>Demo Exam Modal</span>
                </button>
              </div>
            </div>

            <div className="text-[10px] text-[#576d61] text-center mt-0.5">
              Tip: Press <kbd className="bg-white/10 px-1 py-0.5 rounded text-[#b8e0c7]">Ctrl+Shift+D</kbd> to toggle HUD
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="flex items-center gap-1.5 py-2 px-3 bg-[#142a21] hover:bg-[#1e3f31] text-[#e2f1e7] border border-[#b8e0c7]/30 rounded-full shadow-lg hover:-translate-y-0.5 cursor-pointer transition-all"
          onClick={() => setIsOpen(true)}
          title="Open Developer HUD (Ctrl+Shift+D)"
        >
          <Terminal size={14} className="text-emerald-400" />
          <span className="font-semibold tracking-wide">
            {currentPage === 'home' ? 'Student View' : currentPage === 'signin' ? 'Sign In View' : currentPage === 'teachers' ? 'Teachers View' : 'Careers View'}
          </span>
          <ChevronUp size={13} />
        </button>
      )}
    </aside>
  );
}

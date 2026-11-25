/**
 * Quanverse Structured Logger
 * Provides categorized, colorful, and filterable console logging
 * for easy debugging during development.
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
} as const;

const CURRENT_LEVEL = import.meta.env.DEV ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO;

const COLORS: Record<string, string> = {
  NAV: '#4c3fb5',       // Lavender
  API: '#1d5338',       // Sage/Emerald
  EVAL: '#18619e',      // Sky
  EXAM: '#a14c24',      // Peach
  TEACHER: '#7d6110',   // Butter
  AUTH: '#124170',      // Quanverse Navy/Teal
  ERROR: '#9f2441'      // Rose
};

function formatMessage(category: string, message: any): [string, string, any] {
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
  return [`%c[${timestamp}] [${category}]`, `color: ${COLORS[category] || '#555'}; font-weight: bold;`, message];
}

interface LoggerMethods {
  auth: (message: any, ...args: any[]) => void;
  nav: (message: any, ...args: any[]) => void;
  api: (message: any, ...args: any[]) => void;
  eval: (message: any, ...args: any[]) => void;
  exam: (message: any, ...args: any[]) => void;
  teacher: (message: any, ...args: any[]) => void;
  warn: (message: any, ...args: any[]) => void;
  error: (message: any, ...args: any[]) => void;
  [key: string]: (message: any, ...args: any[]) => void;
}

const baseLogger: LoggerMethods = {
  auth(message, ...args) {
    if (CURRENT_LEVEL <= LOG_LEVELS.INFO) {
      console.log(...formatMessage('AUTH', message), ...args);
    }
  },

  nav(message, ...args) {
    if (CURRENT_LEVEL <= LOG_LEVELS.INFO) {
      console.log(...formatMessage('NAV', message), ...args);
    }
  },

  api(message, ...args) {
    if (CURRENT_LEVEL <= LOG_LEVELS.DEBUG) {
      console.log(...formatMessage('API', message), ...args);
    }
  },

  eval(message, ...args) {
    if (CURRENT_LEVEL <= LOG_LEVELS.INFO) {
      console.log(...formatMessage('EVAL', message), ...args);
    }
  },

  exam(message, ...args) {
    if (CURRENT_LEVEL <= LOG_LEVELS.INFO) {
      console.log(...formatMessage('EXAM', message), ...args);
    }
  },

  teacher(message, ...args) {
    if (CURRENT_LEVEL <= LOG_LEVELS.INFO) {
      console.log(...formatMessage('TEACHER', message), ...args);
    }
  },

  warn(message, ...args) {
    if (CURRENT_LEVEL <= LOG_LEVELS.WARN) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },

  error(message, ...args) {
    if (CURRENT_LEVEL <= LOG_LEVELS.ERROR) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }
};

// Safe proxy to prevent crashes if an unmapped category method is called
export const logger: LoggerMethods = new Proxy(baseLogger, {
  get(target, prop: string) {
    if (prop in target) {
      return target[prop];
    }
    // Return a safe fallback function
    return (message: any, ...args: any[]) => {
      if (CURRENT_LEVEL <= LOG_LEVELS.DEBUG && typeof message === 'string') {
        console.log(`[${String(prop).toUpperCase()}] ${message}`, ...args);
      }
    };
  }
});

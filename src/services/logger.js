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
};

const CURRENT_LEVEL = import.meta.env.DEV ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO;

const COLORS = {
  NAV: '#4c3fb5',       // Lavender
  API: '#1d5338',       // Sage/Emerald
  EVAL: '#18619e',      // Sky
  EXAM: '#a14c24',      // Peach
  TEACHER: '#7d6110',   // Butter
  ERROR: '#9f2441'      // Rose
};

function formatMessage(category, message) {
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
  return [`%c[${timestamp}] [${category}]`, `color: ${COLORS[category] || '#555'}; font-weight: bold;`, message];
}

export const logger = {
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

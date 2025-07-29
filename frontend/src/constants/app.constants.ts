/**
 * Common constants used throughout the application
 */

/**
 * Pagination constants
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  ITEMS_PER_PAGE_OPTIONS: [5, 10, 25, 50, 100],
};

/**
 * Application routes
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  USERS: '/users',
  ACTIONS: '/actions',
  ACTIONS_HISTORY: '/actions/history',
  AUDIT: '/audit',
  ITEMS: '/items',
  MESSAGES: '/messages',
  PROFILE: '/profile',
};

/**
 * Form validation limits
 */
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 32,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 500,
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

/**
 * Date format patterns
 */
export const DATE_FORMATS = {
  DEFAULT: 'YYYY-MM-DD',
  WITH_TIME: 'YYYY-MM-DD HH:mm:ss',
  SHORT: 'MM/DD/YYYY',
  DISPLAY: 'MMMM D, YYYY',
};

/**
 * Role constants
 */
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

/**
 * Message constants
 */
export const MESSAGE_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

/**
 * Application-wide timeouts in milliseconds
 */
export const TIMEOUTS = {
  TOAST: 5000,      // Toast notification display time
  DEBOUNCE: 300,    // Debounce delay for inputs
  THROTTLE: 500,    // Throttle delay for repeated actions
  SESSION: 3600000, // 1 hour session timeout
};

/**
 * Table column widths in pixels
 */
export const TABLE_COLUMN_WIDTHS = {
  ICON: 50,
  ID: 70,
  SMALL: 100,
  MEDIUM: 150,
  LARGE: 200,
  XLARGE: 300,
};

/**
 * Common layout spacing values in pixels
 */
export const LAYOUT_SPACING = {
  XS: 4,
  SMALL: 8, 
  MEDIUM: 16,
  LARGE: 24,
  XLARGE: 32,
  XXLARGE: 48,
};

/**
 * Application error messages
 */
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You are not authorized to perform this action',
  SESSION_EXPIRED: 'Your session has expired, please log in again',
  NETWORK_ERROR: 'Network error, please check your connection',
  SERVER_ERROR: 'Server error, please try again later',
  VALIDATION_ERROR: 'Please check the form for errors',
  NOT_FOUND: 'The requested resource was not found',
};

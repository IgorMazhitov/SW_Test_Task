/**
 * API configuration constants
 * Centralized location for all API related constants
 */

/**
 * Base API URL from environment variables with fallback
 */
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3300";

/**
 * Authentication related endpoints
 */
export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/registration",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",
};

/**
 * User related endpoints
 */
export const USER_ENDPOINTS = {
  GET_USERS: "/users",
  CREATE_USER: "/users",
  UPDATE_USER: "/users",
  DELETE_USER: "/users",
};

/**
 * Action related endpoints
 */
export const ACTION_ENDPOINTS = {
  GET_ACTIONS: "/actions",
  CREATE_ACTION: "/actions",
  APPROVE_ACTION: "/actions/approve",
  DECLINE_ACTION: "/actions/decline",
};

/**
 * Item related endpoints
 */
export const ITEM_ENDPOINTS = {
  GET_ITEMS: "/items",
  CREATE_ITEM: "/items",
  GIVE_ITEM: "/items/give",
};

/**
 * Message related endpoints
 */
export const MESSAGE_ENDPOINTS = {
  GET_MESSAGES: "/messages",
  SEND_MESSAGE: "/messages",
};

/**
 * Audit related endpoints
 */
export const AUDIT_ENDPOINTS = {
  GET_LOGS: "/audit",
};

/**
 * Role related endpoints
 */
export const ROLE_ENDPOINTS = {
  GET_ROLES: "/roles",
  CREATE_ROLE: "/roles",
};

/**
 * Storage keys for local storage
 */
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER_EMAIL: "userEmail",
};

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

/**
 * Request timeout in milliseconds
 */
export const REQUEST_TIMEOUT = 10000; // 10 seconds

/**
 * Utility functions for string manipulation
 */

/**
 * Truncate a string to a specified length and append ellipsis if necessary
 * @param str The string to truncate
 * @param maxLength Maximum allowed length
 * @returns Truncated string
 */
export const truncate = (str: string, maxLength: number): string => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  
  return `${str.slice(0, maxLength)}...`;
};

/**
 * Capitalize the first letter of a string
 * @param str The string to capitalize
 * @returns Capitalized string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert a string to title case
 * @param str The string to convert
 * @returns Title cased string
 */
export const toTitleCase = (str: string): string => {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Convert camelCase to sentence case
 * @param str The string to convert
 * @returns Sentence cased string
 */
export const camelToSentenceCase = (str: string): string => {
  if (!str) return '';
  
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, match => match.toUpperCase())
    .trim();
};

/**
 * Generate initials from a name
 * @param name The name to generate initials from
 * @param limit Maximum number of initials (default: 2)
 * @returns Initials string
 */
export const getInitials = (name: string, limit = 2): string => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, limit)
    .join('');
};

/**
 * Safely parse JSON string with error handling
 * @param jsonString The JSON string to parse
 * @returns Parsed object or null if parsing failed
 */
export const safeJsonParse = <T>(jsonString: string): T | null => {
  if (!jsonString) return null;
  
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return null;
  }
};

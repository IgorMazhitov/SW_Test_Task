/**
 * Utility functions for validations
 */
import { VALIDATION } from '../../constants/app.constants';

/**
 * Check if a string is a valid email
 * @param email The email to validate
 * @returns True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  
  return VALIDATION.EMAIL_REGEX.test(email);
};

/**
 * Check if a password meets the minimum requirements
 * @param password The password to validate
 * @returns True if the password is valid, false otherwise
 */
export const isValidPassword = (password: string): boolean => {
  if (!password) return false;
  
  return (
    password.length >= VALIDATION.MIN_PASSWORD_LENGTH &&
    password.length <= VALIDATION.MAX_PASSWORD_LENGTH
  );
};

/**
 * Check if a username meets the minimum requirements
 * @param username The username to validate
 * @returns True if the username is valid, false otherwise
 */
export const isValidUsername = (username: string): boolean => {
  if (!username) return false;
  
  return (
    username.length >= VALIDATION.MIN_USERNAME_LENGTH &&
    username.length <= VALIDATION.MAX_USERNAME_LENGTH
  );
};

/**
 * Check if a description is valid
 * @param description The description to validate
 * @returns True if the description is valid, false otherwise
 */
export const isValidDescription = (description: string): boolean => {
  if (!description) return true; // Description is optional
  
  return description.length <= VALIDATION.MAX_DESCRIPTION_LENGTH;
};

/**
 * Get validation error message for a field
 * @param fieldName The name of the field
 * @param value The current value
 * @returns Error message or empty string if valid
 */
export const getValidationError = (fieldName: string, value: string): string => {
  switch (fieldName) {
    case 'email':
      return isValidEmail(value) ? '' : 'Please enter a valid email address';
    
    case 'password':
      if (!value) return 'Password is required';
      if (value.length < VALIDATION.MIN_PASSWORD_LENGTH) {
        return `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`;
      }
      if (value.length > VALIDATION.MAX_PASSWORD_LENGTH) {
        return `Password cannot exceed ${VALIDATION.MAX_PASSWORD_LENGTH} characters`;
      }
      return '';
    
    case 'userName':
      if (!value) return 'Username is required';
      if (value.length < VALIDATION.MIN_USERNAME_LENGTH) {
        return `Username must be at least ${VALIDATION.MIN_USERNAME_LENGTH} characters`;
      }
      if (value.length > VALIDATION.MAX_USERNAME_LENGTH) {
        return `Username cannot exceed ${VALIDATION.MAX_USERNAME_LENGTH} characters`;
      }
      return '';
    
    case 'description':
      if (value && value.length > VALIDATION.MAX_DESCRIPTION_LENGTH) {
        return `Description cannot exceed ${VALIDATION.MAX_DESCRIPTION_LENGTH} characters`;
      }
      return '';
    
    default:
      return '';
  }
};

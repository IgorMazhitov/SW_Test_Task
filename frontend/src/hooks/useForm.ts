/**
 * Custom hook for form handling
 */
import { useState, ChangeEvent } from 'react';

/**
 * FormField type for handling form fields
 */
type FormField<T> = {
  value: T;
  error: string;
  touched: boolean;
};

/**
 * Form state type mapping field names to FormField
 */
type FormState<T> = {
  [K in keyof T]: FormField<T[K]>;
};

/**
 * Form validation function type
 */
type ValidationFunction<T> = (fieldName: keyof T, value: any) => string;

/**
 * Hook for managing form state and validation
 * @param initialValues Initial values for the form
 * @param validate Validation function
 * @returns Form handling utilities
 */
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validate: ValidationFunction<T>
) => {
  // Initialize form state with initial values
  const initialFormState = Object.keys(initialValues).reduce((acc, key) => {
    acc[key as keyof T] = {
      value: initialValues[key],
      error: '',
      touched: false,
    };
    return acc;
  }, {} as FormState<T>);

  const [formState, setFormState] = useState<FormState<T>>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Check if the form is valid
   */
  const isFormValid = (): boolean => {
    return Object.keys(formState).every(
      (key) => !formState[key as keyof T].error
    );
  };

  /**
   * Handle field change events
   */
  const handleChange = (
    field: keyof T,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = event.target.value;
    const error = validate(field, value);

    setFormState({
      ...formState,
      [field]: {
        value,
        error,
        touched: true,
      },
    });
  };

  /**
   * Set a specific field value
   */
  const setFieldValue = (field: keyof T, value: any) => {
    const error = validate(field, value);

    setFormState({
      ...formState,
      [field]: {
        value,
        error,
        touched: true,
      },
    });
  };

  /**
   * Reset the form to its initial state
   */
  const resetForm = () => {
    setFormState(initialFormState);
  };

  /**
   * Get all form values
   */
  const getFormValues = (): T => {
    return Object.keys(formState).reduce((values, key) => {
      const typedKey = key as keyof T;
      return {
        ...values,
        [key]: formState[typedKey].value,
      };
    }, {} as T);
  };

  /**
   * Touch all fields to show validation errors
   */
  const touchAllFields = () => {
    const touchedState = { ...formState };
    
    Object.keys(touchedState).forEach((key) => {
      const typedKey = key as keyof T;
      const field = touchedState[typedKey];
      touchedState[typedKey] = {
        ...field,
        touched: true,
        error: validate(typedKey, field.value),
      };
    });
    
    setFormState(touchedState);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (
    onSubmit: (values: T) => Promise<void> | void
  ) => {
    touchAllFields();
    
    if (isFormValid()) {
      setIsSubmitting(true);
      
      try {
        await onSubmit(getFormValues());
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    formState,
    handleChange,
    handleSubmit,
    isSubmitting,
    isFormValid,
    resetForm,
    setFieldValue,
    getFormValues,
    touchAllFields,
  };
};

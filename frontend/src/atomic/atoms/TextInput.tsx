/**
 * Text input component
 */
import React from 'react';
import { 
  TextField as MuiTextField, 
  TextFieldProps as MuiTextFieldProps,
  InputAdornment
} from '@mui/material';

/**
 * TextInput props extending partial MUI TextFieldProps
 */
export interface TextInputProps extends Omit<MuiTextFieldProps, 'error'> {
  /**
   * Input name for form handling
   */
  name: string;
  
  /**
   * Input label
   */
  label: string;
  
  /**
   * Input value
   */
  value: string;
  
  /**
   * Error message to display
   */
  error?: boolean;
  
  /**
   * Helper text to display (typically used for error messages)
   */
  helperText?: string;
  
  /**
   * Callback function for input change
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Callback function for input blur
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the input is required
   */
  required?: boolean;
  
  /**
   * Input type (text, password, email, etc.)
   */
  type?: string;
  
  /**
   * Input placeholder
   */
  placeholder?: string;
  
  /**
   * Start adornment (icon or text at the start of the input)
   */
  startAdornment?: React.ReactNode;
  
  /**
   * End adornment (icon or text at the end of the input)
   */
  endAdornment?: React.ReactNode;
  
  /**
   * Maximum length of the input
   */
  maxLength?: number;
}

/**
 * Text input component
 * @param props TextInput properties
 * @returns React component
 */
const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  value,
  error = false,
  helperText,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  type = 'text',
  placeholder,
  startAdornment,
  endAdornment,
  maxLength,
  ...rest
}) => {
  const inputProps = {
    ...(maxLength && { maxLength }),
  };
  
  const startAdornmentElement = startAdornment ? (
    <InputAdornment position="start">{startAdornment}</InputAdornment>
  ) : undefined;
  
  const endAdornmentElement = endAdornment ? (
    <InputAdornment position="end">{endAdornment}</InputAdornment>
  ) : undefined;

  return (
    <MuiTextField
      name={name}
      label={label}
      value={value}
      error={error}
      helperText={helperText}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      required={required}
      type={type}
      placeholder={placeholder}
      fullWidth
      margin="normal"
      variant="outlined"
      inputProps={inputProps}
      InputProps={{
        startAdornment: startAdornmentElement,
        endAdornment: endAdornmentElement,
      }}
      {...rest}
    />
  );
};

export default TextInput;

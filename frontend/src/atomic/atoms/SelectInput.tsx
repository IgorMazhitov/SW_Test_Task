/**
 * Select input component for dropdown selection
 */
import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select as MuiSelect, 
  MenuItem, 
  FormHelperText,
  SelectProps as MuiSelectProps
} from '@mui/material';

/**
 * Option type for select items
 */
export interface SelectOption {
  /**
   * Option value
   */
  value: string | number;
  
  /**
   * Option label
   */
  label: string;
}

/**
 * SelectInput props
 */
export interface SelectInputProps extends Omit<MuiSelectProps, 'error'> {
  /**
   * Input name for form handling
   */
  name: string;
  
  /**
   * Input label
   */
  label: string;
  
  /**
   * Current value
   */
  value: string | number;
  
  /**
   * Array of select options
   */
  options: any[];
  
  /**
   * Callback function for selection change
   */
  onChange: (event: any) => void;
  
  /**
   * Whether there's an error
   */
  error?: boolean;
  
  /**
   * Helper text to display (typically used for error messages)
   */
  helperText?: string;
  
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the input is required
   */
  required?: boolean;
  
  /**
   * Size of the select input
   */
  size?: 'small' | 'medium';
}

/**
 * Select input component for dropdown selection
 * @param props SelectInput properties
 * @returns React component
 */
const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  value,
  options,
  onChange,
  error = false,
  helperText,
  disabled = false,
  required = false,
  size = 'medium',
  ...rest
}) => {
  // Generate a unique ID for the input label
  const labelId = `select-${name}-label`;
  
  return (
    <FormControl
      fullWidth
      margin="normal"
      variant="outlined"
      error={error}
      disabled={disabled}
      required={required}
      size={size}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect
        labelId={labelId}
        id={`select-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectInput;

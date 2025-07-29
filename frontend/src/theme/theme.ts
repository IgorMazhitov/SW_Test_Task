/**
 * Theme configuration for the application
 */
import { createTheme } from '@mui/material/styles';

/**
 * Define color palette constants to avoid magic strings
 */
const COLORS = {
  PRIMARY: {
    MAIN: '#1976d2',
    LIGHT: '#42a5f5',
    DARK: '#1565c0',
    CONTRAST_TEXT: '#fff',
  },
  SECONDARY: {
    MAIN: '#9c27b0',
    LIGHT: '#ba68c8',
    DARK: '#7b1fa2',
    CONTRAST_TEXT: '#fff',
  },
  ERROR: {
    MAIN: '#d32f2f',
    LIGHT: '#ef5350',
    DARK: '#c62828',
    CONTRAST_TEXT: '#fff',
  },
  WARNING: {
    MAIN: '#ed6c02',
    LIGHT: '#ff9800',
    DARK: '#e65100',
    CONTRAST_TEXT: '#fff',
  },
  INFO: {
    MAIN: '#0288d1',
    LIGHT: '#03a9f4',
    DARK: '#01579b',
    CONTRAST_TEXT: '#fff',
  },
  SUCCESS: {
    MAIN: '#2e7d32',
    LIGHT: '#4caf50',
    DARK: '#1b5e20',
    CONTRAST_TEXT: '#fff',
  },
  GREY: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

/**
 * Spacing constants in pixels
 */
const SPACING = {
  UNIT: 8,
  SMALL: 4,
  MEDIUM: 8,
  LARGE: 16,
  XLARGE: 24,
  XXLARGE: 32,
};

/**
 * Font sizes in pixels
 */
const FONT_SIZES = {
  SMALL: 12,
  MEDIUM: 14,
  LARGE: 16,
  XLARGE: 18,
  XXLARGE: 20,
  XXXLARGE: 24,
};

/**
 * Application theme using MUI createTheme
 */
const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY.MAIN,
      light: COLORS.PRIMARY.LIGHT,
      dark: COLORS.PRIMARY.DARK,
      contrastText: COLORS.PRIMARY.CONTRAST_TEXT,
    },
    secondary: {
      main: COLORS.SECONDARY.MAIN,
      light: COLORS.SECONDARY.LIGHT,
      dark: COLORS.SECONDARY.DARK,
      contrastText: COLORS.SECONDARY.CONTRAST_TEXT,
    },
    error: {
      main: COLORS.ERROR.MAIN,
      light: COLORS.ERROR.LIGHT,
      dark: COLORS.ERROR.DARK,
      contrastText: COLORS.ERROR.CONTRAST_TEXT,
    },
    warning: {
      main: COLORS.WARNING.MAIN,
      light: COLORS.WARNING.LIGHT,
      dark: COLORS.WARNING.DARK,
      contrastText: COLORS.WARNING.CONTRAST_TEXT,
    },
    info: {
      main: COLORS.INFO.MAIN,
      light: COLORS.INFO.LIGHT,
      dark: COLORS.INFO.DARK,
      contrastText: COLORS.INFO.CONTRAST_TEXT,
    },
    success: {
      main: COLORS.SUCCESS.MAIN,
      light: COLORS.SUCCESS.LIGHT,
      dark: COLORS.SUCCESS.DARK,
      contrastText: COLORS.SUCCESS.CONTRAST_TEXT,
    },
    grey: COLORS.GREY,
    text: {
      primary: COLORS.GREY[900],
      secondary: COLORS.GREY[700],
      disabled: COLORS.GREY[500],
    },
    background: {
      default: COLORS.GREY[100],
      paper: '#fff',
    },
  },
  spacing: SPACING.UNIT,
  typography: {
    fontSize: FONT_SIZES.MEDIUM,
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: FONT_SIZES.XXXLARGE * 2,
      fontWeight: 500,
    },
    h2: {
      fontSize: FONT_SIZES.XXXLARGE * 1.5,
      fontWeight: 500,
    },
    h3: {
      fontSize: FONT_SIZES.XXXLARGE,
      fontWeight: 500,
    },
    h4: {
      fontSize: FONT_SIZES.XXLARGE,
      fontWeight: 500,
    },
    h5: {
      fontSize: FONT_SIZES.XLARGE,
      fontWeight: 500,
    },
    h6: {
      fontSize: FONT_SIZES.LARGE,
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: SPACING.SMALL,
  },
  components: {
    // Add component overrides here if needed
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export { COLORS, SPACING, FONT_SIZES };
export default theme;

/**
 * Main application component
 */
import React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { useAuth } from './hooks/useAuth';
import AuthPage from './pages/authPage';
import TablesPage from './pages/tablesPage';

/**
 * App component - root of the application
 * @returns React component
 */
const App: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  
  // Show loading state if checking authentication
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          Loading...
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isAuthenticated ? <AuthPage /> : <TablesPage />}
    </ThemeProvider>
  );
};

export default observer(App);

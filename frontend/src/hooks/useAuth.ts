/**
 * Custom hook for authentication state management
 */
import { useContext, useEffect, useState } from 'react';
import { Context } from '../index';
import { IUser } from '../types/user.types';
import { USER_ROLES } from '../constants/app.constants';
import { IRole } from '../types/role.types';

/**
 * Hook for managing authentication state
 * @returns Authentication state and utility functions
 */
export const useAuth = () => {
  const { store } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (localStorage.getItem('token')) {
          await store.checkAuth();
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [store]);

  /**
   * Check if the user has a specific role
   * @param roleName Name of the role to check
   * @returns True if the user has the role, false otherwise
   */
  const hasRole = (roleName: string): boolean => {
    if (!store.isAuth || !store.user?.role) return false;
    return store.user.role.name === roleName;
  };

  /**
   * Check if the user is an admin
   * @returns True if the user is an admin, false otherwise
   */
  const isAdmin = (): boolean => {
    return hasRole(USER_ROLES.ADMIN);
  };

  /**
   * Get current user data
   * @returns User data or null if not authenticated
   */
  const getCurrentUser = (): IUser | null => {
    return store.isAuth ? store.user : null;
  };

  /**
   * Get user's role
   * @returns User's role or null if not authenticated
   */
  const getUserRole = (): IRole | null => {
    return store.isAuth && store.user?.role ? store.user.role : null;
  };

  /**
   * Login with email and password
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const error = await store.login(email, password);
      return !error;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  /**
   * Register a new user
   */
  const register = async (
    email: string,
    password: string,
    userName: string,
    roleId: number
  ): Promise<boolean> => {
    try {
      await store.signup(email, password, roleId, userName);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  /**
   * Logout current user
   */
  const logout = async (): Promise<void> => {
    try {
      await store.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    isAuthenticated: store.isAuth,
    user: store.user,
    loading,
    hasRole,
    isAdmin,
    getCurrentUser,
    getUserRole,
    login,
    register,
    logout,
  };
};

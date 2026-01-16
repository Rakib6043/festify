import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check login status when application starts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await authService.checkLoginStatus();
      if (response.logged_in && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Authentication status check error:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error occurred:", error);
      // Clear local state even if server error occurs
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const registerUser = async (userData) => {
    try {
        const response = await authService.register(userData);
        if (response.logged_in) {
            setUser(response.user);
            setIsAuthenticated(true);
            return { success: true };
        }
    } catch (error) {
        throw error;
    }
  };

  const updateUserProfile = async (userData) => {
      try {
          const response = await authService.updateProfile(userData);
          setUser(response.user);
          return { success: true };
      } catch (error) {
          throw error;
      }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    login,
    logout,
    checkAuthStatus,
    registerUser,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const result = await authService.login(email, password);
      if (result.token) {
        localStorage.setItem('token', result.token); // Save token to localStorage
      }
      setUser(result.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message || 'Error en el servidor' };
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem('token'); // Remove token from localStorage
    setUser(null);
  };

  const register = async (name, lastName, email, password) => {
    try {
      const result = await authService.register(name, lastName, email, password);
      if (result.token) {
        localStorage.setItem('token', result.token); // Save token to localStorage
      }
      setUser(result.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message || 'Error en el servidor' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};


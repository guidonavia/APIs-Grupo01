import { createContext, useContext, useState, useEffect } from 'react';

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
      const response = await fetch(`http://localhost:3001/users?email=${email}`);
      
      if (!response.ok) {
        throw new Error('Error en la petición');
      }
      
      const users = await response.json();
      const foundUser = users.find(u => u.password === password);
      
      if (foundUser) {
        setUser(foundUser);
        return { success: true };
      } else {
        return { success: false, message: 'Credenciales inválidas' };
      }
    } catch (error) {
      return { success: false, message: 'Error en el servidor' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
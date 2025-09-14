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

  const register = async (name, email, password) => {
    try {
      // Valido si el usuario a registrar ya existe
      const checkResponse = await fetch(`http://localhost:3001/users?email=${email}`);
      const existingUsers = await checkResponse.json();
      
      // Si existe, retorno un aviso
      if (existingUsers.length > 0) {
        return { success: false, message: 'El email ya está registrado' };
      }

      // Create new user
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en el registro');
      }

      const newUser = await response.json();
      setUser(newUser);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Error en el servidor' };
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
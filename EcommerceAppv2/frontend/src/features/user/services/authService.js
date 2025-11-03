import api from '../../../config/axios';
import { API_CONFIG } from '../../../shared/constants';

// Helper function to decode JWT token
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const authService = {
  // Login user
  login: async (email, password) => {
    try {
      console.log('Login request to:', '/auth/login');
      console.log('With credentials:', { email, password });

      const response = await api.post('/auth/login', { 
        email, 
        password,
      });

      console.log('Raw login response:', response);

      // The token comes directly as a string in response.data
      const token = response.data;

      if (!token) {
        throw new Error('No se recibió el token de autenticación');
      }

      // Store the authentication token
      localStorage.setItem('token', token);

      // Decode the JWT token to get user info
      const decodedToken = decodeToken(token);
      console.log('Decoded token:', decodedToken);

      // Create user object combining email and decoded token info
      const user = {
        email,
        roles: decodedToken?.roles || 'ROLE_USER',
        sub: decodedToken?.sub || email,
        // Puedes agregar más campos según sea necesario
      };

      // Store user information
      localStorage.setItem('user', JSON.stringify(user));

      return {
        success: true,
        user
      };

    } catch (error) {
      console.error('Login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      // Handle specific error cases
      if (error.response?.status === 401) {
        throw new Error('Email o contraseña incorrectos');
      }

      if (error.response?.status === 404) {
        throw new Error('Usuario no encontrado');
      }

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }

      // Default error message
      throw new Error('Error al intentar iniciar sesión');
    }
  },

  // Register user
  register: async (name, lastName, email, password) => {
    try {
      const response = await api.post('/auth/register', {
        nombre: name,
        apellido: lastName,
        email,
        password,
      });
      
      // Check if response has data
      if (response.data) {
        const { token, user } = response.data;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          return { success: true, user };
        }
      }
      
      // If we get here, the request was successful but might not have returned expected data
      // This is fine for registration which might not return a token immediately
      return { 
        success: true, 
        message: 'Registro exitoso' 
      };

    } catch (error) {
      // Log the error for debugging
      console.error('Registration error:', error);
      
      // If the request was successful but had a parsing error
      if (error.response?.status === 200 || error.response?.status === 201) {
        return {
          success: true,
          message: 'Registro exitoso'
        };
      }

      // Handle other errors
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Error en el servidor'
      );
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
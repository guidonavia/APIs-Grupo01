import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Logo } from '../../../../../shared/components/ui';
import './LoginForm.css';

const RegisterForm = ({ switchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await register(name, email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="login-wrapper">
      <header className="login-header">
        <Logo />
      </header>
      <div className="login-container">
        <h2>Crear Cuenta</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Registrarse
          </button>
        </form>
        <p className="switch-auth">
          ¿Ya tienes una cuenta?{' '}
          <button className="switch-button" onClick={switchToLogin}>
            Iniciar Sesión
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;


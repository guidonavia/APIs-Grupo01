import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Logo } from '../../../../../shared/components/ui';
import RegisterForm from '../RegisterForm/RegisterForm';
import './LoginForm.css';

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  if (isRegistering) {
    return <RegisterForm switchToLogin={() => setIsRegistering(false)} />;
  }

  return (
    <div className="login-wrapper">
      <header className="login-header">
        <Logo />
      </header>
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
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
            Ingresar
          </button>
        </form>
        <p className="switch-auth">
          ¿No tienes una cuenta?{' '}
          <button className="switch-button" onClick={() => setIsRegistering(true)}>
            Registrarse
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;


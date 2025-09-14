import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Login attempt with:', { email, password });
    
    try {
      // Fetch users from db-users.json
      console.log('Fetching users...');
      const response = await fetch('http://localhost:3001/users');
      const users = await response.json();
      console.log('Users fetched:', users);
      
      // Check if credentials match
      const user = users.find(u => u.email === email && u.password === password);
      console.log('Found user:', user);
      
      if (user) {
        console.log('Logging in with user:', user);
        const result = await login(user);
        console.log('Login result:', result);
        if (result.success) {
          // Login successful - you might want to redirect here
          console.log('Login successful!');
        } else {
          setError(result.message || 'Error al iniciar sesión');
        }
      } else {
        setError('Email o contraseña incorrectos');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Error al iniciar sesión. Intente nuevamente.');
    }
  };

  return (
    <LoginWrapper>
      <Card>
        <h2>Iniciar Sesión</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <label>Correo</label>
          <input
            type="email"
            placeholder="Ingrese su correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="***********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <ForgotPassword href="#">Olvido su Contraseña?</ForgotPassword>

          <button type="submit">Ingresar</button>
        </Form>
        <RegisterPrompt>
          <span>Todavia no tiene una cuenta?</span> <RegisterLink href="#">Registrese</RegisterLink>
        </RegisterPrompt>
      </Card>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
`;

const Card = styled.div`
  background: white;
  padding: 2rem 3rem;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  text-align: center;

  h2 {
    margin-bottom: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    text-align: left;
    font-weight: 600;
  }

  input {
    padding: 0.7rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    margin-top: 1rem;
    padding: 0.7rem;
    background-color: hsl(26, 100%, 55%);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      opacity: 0.9;
    }
  }
`;

const ForgotPassword = styled.a`
  display: block;
  text-align: right;
  font-size: 0.9rem;
  color: hsl(220, 14%, 75%);
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  text-decoration: underline;
  cursor: pointer;
`;

const RegisterPrompt = styled.div`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: hsl(219, 9%, 45%);

  span {
    margin-right: 0.3rem;
  }
`;

const RegisterLink = styled.a`
  color: hsl(26, 100%, 55%);
  text-decoration: underline;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #fde8e8;
`;

export default Login;
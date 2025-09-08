import React from "react";
import styled from "styled-components";

const SignInModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Card onClick={(e) => e.stopPropagation()}>
        <h2>Iniciar Sesion</h2>
        <Form>
          <label>Correo</label>
          <input type="email" placeholder="Ingrese su correo" />
          
          <label>Contraseña</label>
          <input type="password" placeholder="***********" />
          <ForgotPassword href="#">Olvido su Contraseña?</ForgotPassword>

          <button type="button" onClick={onSubmit}>Ingresar</button>
        </Form>
        <RegisterPrompt>
          <span>Todavia no tiene una cuenta?</span> <RegisterLink href="#">Registrese</RegisterLink>
        </RegisterPrompt>
      </Card>
    </Overlay>
  );
};

export default SignInModal;

/* ===== Styled Components ===== */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
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

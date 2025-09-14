import styled from "styled-components"
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Login.css';

const AvatarMenu = ({ isOpen, closeMenu }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSell = () => {
    closeMenu() 
    navigate('/sell');
  };

  return (
    <MenuWrapper className={`${isOpen ? "active" : ""}`}>
      <ul>
        {user ? (
          <>
            <li>
              <button onClick={handleSell}>Vender Producto</button>
            </li>
            <li>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
          </li>
        )}
      </ul>
    </MenuWrapper>
  )
}

const MenuWrapper = styled.div`
  position: absolute;
  top: 6rem;
  right: 0;
  background-color: hsl(var(--white));
  box-shadow: 0 2rem 5rem -2rem hsl(var(--black) / 0.2);
  border-radius: 1rem;
  padding: 1rem;
  display: none;
  z-index: 1000;

  &.active {
    display: block;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: 0;

      button {
        background: none;
        border: none;
        color: hsl(var(--dark-grayish-blue));
        font-size: 1.6rem;
        padding: 1rem;
        text-align: left;
        cursor: pointer;
        width: 100%;

        &:hover {
          background-color: hsl(var(--light-grayish-blue));
        }
      }
    }
  }
`

export default AvatarMenu
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

const AvatarMenu = ({ isOpen, closeMenu }) => {
  const navigate = useNavigate()

  const handleSellClick = () => {
    closeMenu() 
    navigate("/sell")
  }

  return (
    <MenuWrapper className={`${isOpen ? "active" : ""}`}>
      <ul>
        <li>
          <button onClick={handleSellClick}>Vender</button>
        </li>
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

AvatarMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
}

export default AvatarMenu
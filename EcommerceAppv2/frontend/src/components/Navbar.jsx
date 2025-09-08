import styled from "styled-components"
import  Logo  from "../icons/Logo"
import Cart from "../icons/Cart"
import { avatar } from "../assets/imagedata"
import { useState } from "react"

const Navbar = ({ user, onSignInClick }) => {
  return (
    <NavWrapper>
      <div className="logo">
        <Logo />
      </div>
      <div className="search">
        <input type="text" placeholder="Buscar Productos..." />
      </div>
      <div className="user-action">
        {user ? (
          <>
            <button className="cart-btn">
              <Cart />
            </button>
            <img className="avatar" src={avatar} alt="avatar" />
          </>
        ) : (
          <button onClick={onSignInClick}>Iniciar Sesion</button>
        )}
      </div>
    </NavWrapper>
  )
}

export default Navbar

const NavWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #ddd;

  .search input {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    width: 300px;
  }

  .user-action button {
    padding: 0.5rem 1rem;
    background-color: #ff7a00;
    color: white;
    border: none;
    cursor: pointer;
  }

  .avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }

  .cart-btn svg {
  width: 2rem;
  height: 2rem;
  fill: currentColor; /* so it inherits text color */
}
`

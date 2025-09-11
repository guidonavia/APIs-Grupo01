import styled from "styled-components"
import  Logo  from "../../../../assets/images/logo.png";
import Cart from "../../ui/icons/Cart";
import avatar from "../../../../assets/images/image-avatar.png";
import { useState } from "react"

const Navbar = ({ user, onSignInClick }) => {
  return (
    <NavWrapper>
      <div className="logo">
        <img src={Logo} alt="logo" style={{ height: "5rem" }} />
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
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #ddd;

  .search input {
    padding: 0.9rem 1rem;
    font-size: 1rem;
    width: 800px;
  }

  .user-action button:not(.cart-btn) {
    padding: 0.7rem 1rem;
    background-color: #ff7a00;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .user-action {
    display: flex;
    align-items: center;
    gap: 2.5rem;
  }

  .avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  
  .cart-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

  .cart-btn svg {
  width: 2.5rem;
  height: 2rem;
}
`

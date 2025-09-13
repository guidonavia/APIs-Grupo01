import styled from "styled-components"
import Logo from "../../../../assets/images/logo.png";
import Cart from "../../ui/icons/Cart";
import avatar from "../../../../assets/images/image-avatar.png";
import Search from "../Header/Search.jsx";
import Search from "../Header/Search.jsx";
import { useState } from "react"
import FloatingCart from "../../../../features/cart/components/FloatingCart";
import AvatarMenu from "../../../../features/user/components/profile/ProfileInfo/AvatarMenu";

const Navbar = ({ user, onSignInClick, search, setSearch, search, setSearch }) => {
  const [showCart, setShowCart] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);

  return (
    <NavWrapper>
      <div className="logo">
        <img src={Logo} alt="logo" style={{ height: "5rem" }} />
      </div>
      <Search search={search} setSearch={setSearch} />
      <Search search={search} setSearch={setSearch} />
      <div className="user-action">
        {user ? (
          <>
            <div className="cart-container">
              <button 
                className="cart-btn"
                onClick={() => setShowCart(!showCart)}
              >
                <Cart />
              </button>
              <FloatingCart className={showCart ? 'active' : ''} />
            </div>
            <div className="avatar-container">
              <img 
                className="avatar" 
                src={avatar} 
                alt="avatar" 
                onClick={() => setShowAvatarMenu(!showAvatarMenu)}
              />
              {showAvatarMenu && (
                <AvatarMenu />
              )}
            </div>
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
  position: relative;

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

  .cart-container, .avatar-container {
    position: relative;
    cursor: pointer;
  }

  .avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
  
  .cart-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  .cart-btn svg {
    width: 2.5rem;
    height: 2rem;
  }
`

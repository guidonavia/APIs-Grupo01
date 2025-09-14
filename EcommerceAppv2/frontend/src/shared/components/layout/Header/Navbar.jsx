import styled from "styled-components"
import Logo from "../../ui/icons/Logo";
import Cart from "../../ui/icons/Cart";
import avatar from "../../../../../public/images/image-avatar.png";
import Search from "../Header/Search.jsx";
import { useState } from "react"
import FloatingCart from "../../../../features/cart/components/FloatingCart";
import AvatarMenu from "../../../../features/user/components/profile/ProfileInfo/AvatarMenu";
import { Link } from "react-router-dom"; 

const Navbar = ({ user, onSignInClick, search, setSearch, onLogout }) => {
  const [showCart, setShowCart] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);

  return (
    <NavWrapper>
      <div className="logo">
        <Link to="/">
          <Logo style={{ height: "5rem" }} />
        </Link>
      </div>
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
              <button
                className = "avatar-btn"
                onClick={() => setShowAvatarMenu(!showAvatarMenu)}
              >
                <img className="avatar" src={avatar} alt="avatar" /> 
              </button>
              {showAvatarMenu && (
                <AvatarMenu
                  isOpen={showAvatarMenu} 
                  closeMenu={() => setShowAvatarMenu(false)} 
                  onLogout={onLogout}
                />
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

  .user-action button:not(.cart-btn):not(.avatar-btn)  {
    padding: 0.7rem 1rem;
    background-color: #a1a19cff;
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
  
  .avatar-btn {
    background: none; 
    border: none;     
    padding: 0;       
    cursor: pointer; 
    display: inline-flex;
    align-items: center;
    justify-content: center;
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

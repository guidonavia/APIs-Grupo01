import styled from "styled-components"
import { Logo, Menu, Cart } from "../icons/index"
import { avatar } from "../assets/imagedata"
import Search from "./Search.jsx"
import FloatingCart from "../components/FloatingCart"
import AvatarMenu from "../components/AvatarMenu"
import { useGlobalContext } from "../context/context"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = ({search, setSearch, onLogout }) => {
  const { showSidebar, showCart, hideCart, state } = useGlobalContext()
  const { logout, user } = useAuth()
  const [isAvatarMenuOpen, setAvatarMenuOpen] = useState(false)


  const toggleAvatarMenu = () => setAvatarMenuOpen((prev) => !prev)
  const closeAvatarMenu = () => setAvatarMenuOpen(false)

  return (
    <NavWrapper>
      <nav className="nav-container">
        <div className="nav-left">
          <button onClick={showSidebar} className="menu-btn">
            <Menu />
          </button>
          <div className="logo">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="search">
            <Search search={search} setSearch={setSearch} />
          </div>
        </div>

        <div className="nav-right">
              <button
                onClick={() => {
                  if (state.showingCart) {
                    hideCart()
                  } else {
                    showCart()
                  }
                }}
                className="cart-btn"
              >
                <Cart />
                {state.totalCartSize > 0 && <span>{state.totalCartSize}</span>}
              </button>

              <button className="avatar-btn" onClick={toggleAvatarMenu}>
                <img src={avatar} alt="avatar" />
              </button>

              <AvatarMenu
                isOpen={isAvatarMenuOpen}
                closeMenu={closeAvatarMenu}
                onLogout={onLogout}
              />

              <FloatingCart
                className={`${state.showingCart ? "active" : ""}`}
              />
        </div>
      </nav>

      {user && (
        <button onClick={logout} className="logout-button">
          Cerrar Sesión
        </button>
      )}
    </NavWrapper>
    
  )
}

const NavWrapper = styled.header`
  position: relative;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #ddd;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 1.6rem;

    .menu-btn {
      display: block;

      @media only screen and (min-width: 768px) {
        display: none;
      }
    }
  }

  .search input {
    padding: 0.9rem 1rem;
    font-size: 1rem;
    width: 400px;
  }

  .nav-right {
    position: relative;
    display: flex;
    align-items: center;
    gap: 2rem;

    .signin-btn {
      padding: 0.7rem 1rem;
      background-color: #a1a19c;
      color: white;
      border: none;
      cursor: pointer;
    }

    .cart-btn {
      position: relative;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;

      svg,
      path {
        fill: black;
        stroke: black;
      }

      span {
        user-select: none;
        position: absolute;
        top: -1rem;
        right: -1rem;
        background-color: hsl(var(--orange));
        font-weight: 700;
        color: white;
        border-radius: 50%;
        padding: 0.3rem 0.8rem;
        font-size: 1.1rem;
      }
    }

    .avatar-btn {
      height: 2.8rem;
      width: 2.8rem;
      border-radius: 50%;
      background: none;
      border: none;
      cursor: pointer;

      img {
        width: 100%;
        border-radius: 50%;
      }

      &:hover {
        outline: 2px solid hsl(var(--orange));
      }
    }
  }

  @media only screen and (min-width: 768px) {
    .search input {
      width: 600px;
    }

    .avatar-btn {
      height: 3.5rem;
      width: 3.5rem;
    }
  }

  @media only screen and (min-width: 1000px) {
    max-width: 80%;
    margin: 0 auto;

    .avatar-btn {
      height: 5rem;
      width: 5rem;
    }

    .search input {
      width: 800px;
    }
  }
`

export default Navbar

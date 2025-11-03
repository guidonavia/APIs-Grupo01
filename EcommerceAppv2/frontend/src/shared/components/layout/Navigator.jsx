import styled from "styled-components";
import { Logo, Menu, Cart } from "../ui";
import { avatar } from "../../../assets/imagedata";
import ProductSearch from "../../../features/products/components/catalog/ProductSearch/ProductSearch";
import CartDrawer from "../../../features/cart/components/CartDrawer/CartDrawer";
import AvatarMenu from "../../../features/user/components/profile/AvatarMenu";
import { useCart } from "../../../features/cart/context/CartContext";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductFilters from "../../../features/products/components/catalog/ProductFilters/ProductFilters";
import api from "../../../config/axios";

const Navbar = ({
  search,
  setSearch,
  selectedcategoria,
  setcategoria,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  resultsCount,
}) => {
  const { showSidebar, showCart, hideCart, state } = useCart();
  const hideTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);
  const [isAvatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categorias');
        const data = res.data;
        if (Array.isArray(data)) {
          const names = data.map((c) => c.nombre || c.name).filter(Boolean);
          setCategories(["All", ...names]);
        }
      } catch (e) {
        // keep default categories on error
        setCategories(["All"]);
      }
    };
    fetchCategories();
  }, []);

  const toggleAvatarMenu = () => setAvatarMenuOpen((prev) => !prev);
  const closeAvatarMenu = () => setAvatarMenuOpen(false);

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
            <ProductSearch search={search} setSearch={setSearch} />
            {typeof resultsCount === "number" && (
              <ResultBadge>{resultsCount} resultados</ResultBadge>
            )}
          </div>
        </div>

        <div className="nav-right">
          <button
            onMouseEnter={() => {
              if (hideTimer.current) {
                clearTimeout(hideTimer.current);
                hideTimer.current = null;
              }
              showCart();
            }}
            onMouseLeave={() => {
              // delay hiding to allow moving into the drawer without flicker
              hideTimer.current = setTimeout(() => hideCart(), 250);
            }}
            className="cart-btn"
          >
            <Cart />
            {state.totalCartSize > 0 && <span>{state.totalCartSize}</span>}
          </button>

          <button className="avatar-btn" onClick={toggleAvatarMenu}>
            <img src={avatar} alt="avatar" />
          </button>

          <AvatarMenu isOpen={isAvatarMenuOpen} closeMenu={closeAvatarMenu} />

          <CartDrawer
            className={`${state.showingCart ? "active" : ""}`}
            onMouseEnter={() => {
              if (hideTimer.current) {
                clearTimeout(hideTimer.current);
                hideTimer.current = null;
              }
              showCart();
            }}
            onMouseLeave={() => {
              hideTimer.current = setTimeout(() => hideCart(), 200);
            }}
          />
        </div>
      </nav>

      <ProductFilters
        categories={categories}
        selectedcategoria={selectedcategoria}
        setcategoria={setcategoria}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
      />
    </NavWrapper>
  );
};

const NavWrapper = styled.header`
  position: relative;
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(90deg, #fff, #fff);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);

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
    /* search is styled by Search component; default sizing here */
    padding: 0;
    font-size: 1rem;
    width: auto;
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
`;

const ResultBadge = styled.span`
  display: inline-block;
  margin-left: 0.8rem;
  background: linear-gradient(90deg, hsl(25 90% 55%), hsl(15 90% 45%));
  color: white;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.9rem;
`;

export default Navbar;

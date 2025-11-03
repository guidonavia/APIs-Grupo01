import { Routes, Route, Navigate } from "react-router-dom";
import CheckoutPage from "../features/checkout/components/CheckoutPage";
import SellPage from "../features/products/pages/SellPage";
import LoginForm from "../features/user/components/auth/LoginForm/LoginForm";
import HomePage from "../features/products/pages/HomePage";
import ProductPage from "../features/products/pages/ProductDetail";
import { useAuth } from "../features/user/context/AuthContext";
import Layout from "../shared/components/layout/Layout";
import { useState } from "react";
import ProfilePage from "../features/profile/components/ProfilePage";

export default function App() {
  const { user } = useAuth();
  const isAuth = !!user;

  // State for filters, search, etc.
  const [search, setSearch] = useState("");
  const [selectedcategoria, setcategoria] = useState("All");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");

  const filters = { priceMin, priceMax, color, size, gender };

  return (
    <div className="App">
      <Routes>
        {/* LOGIN OUTSIDE LAYOUT */}
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" replace /> : <LoginForm />}
        />

        {/* ALL OTHER ROUTES INSIDE LAYOUT */}
        <Route
          element={
            <Layout
              search={search}
              setSearch={setSearch}
              selectedcategoria={selectedcategoria}
              setcategoria={setcategoria}
              priceMin={priceMin}
              setPriceMin={setPriceMin}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              color={color}
              setColor={setColor}
              size={size}
              setSize={setSize}
              gender={gender}
              setGender={setGender}
            />
          }
        >
          {/* HOME */}
          <Route
            path="/"
            element={
              <HomePage
                search={search}
                selectedcategoria={selectedcategoria}
                setcategoria={setcategoria}
                filters={filters}
              />
            }
          />

          {/* PRODUCT DETAIL */}
          <Route path="/productos/:id" element={<ProductPage />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/checkout"
            element={
              isAuth ? <CheckoutPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/sell"
            element={isAuth ? <SellPage /> : <Navigate to="/login" replace />}
          />
          {/* MI PERFIL */}
          <Route
            path="/profile"
            element={isAuth ? <ProfilePage /> : <Navigate to="/login" replace />}
          />
        </Route>
      </Routes>
    </div>
  );
}


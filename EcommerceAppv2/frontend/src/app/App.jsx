import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import CheckoutPage from "../features/checkout/components/CheckoutPage";
import SellPage from "../features/products/pages/SellPage";
import LoginForm from "../features/user/components/auth/LoginForm/LoginForm";
import HomePage from "../features/products/pages/HomePage";
import ProductPage from "../features/products/pages/ProductDetail";
import { useAuth } from "../features/user/context/AuthContext";
import Layout from "../shared/components/layout/Layout";
import { useState } from "react";

const PROTECTED_PATHS = ["/checkout", "/sell"];

function GateRoutes({ search, selectedCategory, setCategory, filters, setResultsCount }) {
  const { user } = useAuth();
  const isAuth = !!user;
  const { pathname } = useLocation();
  const needsAuth =
    !isAuth && PROTECTED_PATHS.some((p) => pathname.startsWith(p));

  if (needsAuth) return <LoginForm />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            search={search}
            selectedCategory={selectedCategory}
            setCategory={setCategory}
            filters={filters}
            setResultsCount={setResultsCount}
          />
        }
      />
      <Route
        path="/login"
        element={isAuth ? <Navigate to="/" replace /> : <LoginForm />}
      />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/sell" element={<SellPage />} />
    </Routes>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setCategory] = useState("All");
  // Filters
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");

  const filters = { priceMin, priceMax, color, size, gender };

  return (
    <div className="App">
      <Layout
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setCategory={setCategory}
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
      >
        <GateRoutes
          search={search}
          selectedCategory={selectedCategory}
          setCategory={setCategory}
          filters={filters}
        />
      </Layout>
    </div>
  );
}

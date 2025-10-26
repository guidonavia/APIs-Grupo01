import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import CheckoutPage from "./components/CheckoutPage";
import SellPage from "./components/SellPage";
import Login from "./components/Login";
import HomePage from "./layout/HomePage";
import ProductPage from "./layout/ProductDetail";
import { useAuth } from "./context/AuthContext";
import Layout from "./layout/Layout";
import { useState } from "react";

const PROTECTED_PATHS = ["/checkout", "/sell"];

function GateRoutes({ search, selectedCategory, setCategory, filters }) {
  const { user } = useAuth();
  const isAuth = !!user;
  const { pathname } = useLocation();
  const needsAuth =
    !isAuth && PROTECTED_PATHS.some((p) => pathname.startsWith(p));

  if (needsAuth) return <Login />;

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
          />
        }
      />
      <Route
        path="/login"
        element={isAuth ? <Navigate to="/" replace /> : <Login />}
      />
      <Route path="/product/:id" element={<ProductPage />} />
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

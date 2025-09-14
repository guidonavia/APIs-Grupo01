import React, { useState } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import Navbar from "../shared/components/layout/Header/Navbar"
import HomePage from "./routes/HomePage"
import ProductPage from "./routes/ProductPage"
import CheckoutPage from "./routes/CheckoutPage"
import SellPage from "./routes/SellPage"
import Login from "../features/user/components/profile/Login/Login"
import { useGlobalContext } from "../context/context"
import { useAuth } from "../context/AuthContext"

function App() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const { state } = useGlobalContext();

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Navbar 
        user={user}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<HomePage search={search} />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route 
          path="/checkout" 
          element={
            state.cart.length > 0 ? (
              <CheckoutPage />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/sell" 
          element={
            user ? (
              <SellPage />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </>
  );
}

export default App






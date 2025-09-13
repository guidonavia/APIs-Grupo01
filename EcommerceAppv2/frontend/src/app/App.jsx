import React, { useState } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import Navbar from "../shared/components/layout/Header/Navbar"
import SignInModal from "../features/user/components/auth/LoginForm/SignInModal"
import HomePage from "../layout/HomePage"
import ProductPage from "../layout/ProductPage"
import CheckoutPage from "../layout/CheckoutPage"
import SellPage from "../features/products/components/management/SellPage"
import Login from "../components/Login"
import { useGlobalContext } from "../context/context"
import { useAuth } from "../context/AuthContext"

function App() {
  const { user } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useState("");
  const { state } = useGlobalContext();

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Navbar 
        user={user} 
        onSignInClick={() => setShowSignIn(true)}
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

      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSubmit={() => setShowSignIn(false)}
      />
    </>
  );
}

export default App






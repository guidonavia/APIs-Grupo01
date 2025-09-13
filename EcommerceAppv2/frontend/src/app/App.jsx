import React, { useState } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import Navbar from "../shared/components/layout/Header/Navbar"
import SignInModal from "../features/user/components/auth/LoginForm/SignInModal"
import HomePage from "../layout/HomePage"
import ProductPage from "../layout/ProductPage"
import CheckoutPage from "../layout/CheckoutPage"
import SellPage from "../features/products/components/management/SellPage"
import { useGlobalContext } from "../context/context"

function App() {
  const [user, setUser] = useState(null)
  const [showSignIn, setShowSignIn] = useState(false)
  const [search, setSearch] = useState("");
  const { state } = useGlobalContext();

  const handleSignIn = () => {
    // Mock login
    setUser({ name: "John Doe" })
    setShowSignIn(false)
  }

  return (
    <>
      <Navbar
       user={user} onSignInClick={() => setShowSignIn(true)}
       search={search} setSearch={setSearch}
      />
      {console.log("search:", search)}
      <Routes>
        <Route path="/" element={<HomePage />} />
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
        onSubmit={handleSignIn}
      />
    </>
  );
}

export default App






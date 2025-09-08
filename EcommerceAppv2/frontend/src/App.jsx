import React, { useState } from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar"
import SignInModal from "./components/SignInModal"
import HomePage from "./layout/HomePage"
import ProductPage from "./layout/ProductPage"

function App() {
  const [user, setUser] = useState(null)
  const [showSignIn, setShowSignIn] = useState(false)

  const handleSignIn = () => {
    // Mock login
    setUser({ name: "John Doe" })
    setShowSignIn(false)
  }

  return (
    <>
      <Navbar user={user} onSignInClick={() => setShowSignIn(true)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
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






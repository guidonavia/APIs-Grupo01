import React, { useState } from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Navbar from "../shared/components/layout/Header/Navbar"
import SignInModal from "../features/user/components/auth/LoginForm/SignInModal"
import HomePage from "../layout/HomePage"
import ProductPage from "../layout/ProductPage"

function App() {
  const [user, setUser] = useState(null)
  const [showSignIn, setShowSignIn] = useState(false)
  const [search, setSearch] = useState("");

  const handleSignIn = () => {
    // Mock login
    setUser({ name: "John Doe" })
    setShowSignIn(false)
  }

  return (
    <>
      <Navbar
       user={user} onSignInClick={() => setShowSignIn(true)} 
       search={search} setSearch={setSearch} />
       {console.log("search:", search)}
      <Routes>
        <Route path="/" element={<HomePage search={search} />} />
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






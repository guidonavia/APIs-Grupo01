import { createContext, useContext, useState } from "react"

const AppContext = createContext()

const AppProvider = ({ children }) => {
  // Sidebar open/close
  const [showSidebar, setShowSidebar] = useState(false)
  const toggleSidebar = () => setShowSidebar((prev) => !prev)
  const closeSidebar = () => setShowSidebar(false)

  // Cart open/close (floating cart)
  const [showCart, setShowCart] = useState(false)
  const toggleCart = () => setShowCart((prev) => !prev)
  const closeCart = () => setShowCart(false)

  // Mock user login
  const [user, setUser] = useState(null)
  const signIn = () => setUser({ name: "John Doe" })
  const signOut = () => setUser(null)

  return (
    <AppContext.Provider
      value={{
        showSidebar,
        toggleSidebar,
        closeSidebar,
        showCart,
        toggleCart,
        closeCart,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => useContext(AppContext)

export { AppProvider, useGlobalContext }

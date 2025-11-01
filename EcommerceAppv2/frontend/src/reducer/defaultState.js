import { APP_CONFIG } from "../shared/constants"

// Load cart from localStorage on initialization
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem(APP_CONFIG.CART_STORAGE_KEY)
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart)
      const totalCartSize = parsedCart.reduce((total, item) => total + (item.amount || 0), 0)
      return { cart: parsedCart, totalCartSize }
    }
  } catch (error) {
    console.warn("Failed to load cart from localStorage:", error)
  }
  return { cart: [], totalCartSize: 0 }
}

const { cart, totalCartSize } = loadCartFromStorage()

export const defaultState = {
  cart,
  totalCost: 0,
  totalCartSize,
  showSidebar: false,
  screenWidth: typeof window !== "undefined" ? window.innerWidth : 768,
  showingOverlay: false,
  showingCart: false
}
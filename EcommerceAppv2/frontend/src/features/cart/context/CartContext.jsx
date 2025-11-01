import { useEffect, useContext, createContext, useReducer } from "react"
import reducer from "../../../reducer/reducer"
import { defaultState } from "../../../reducer/defaultState"
import {
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  READ_SCREENWIDTH,
  ADD_TO_CART,
  REMOVE_ITEM,
  INCREASE_CART_ITEM,
  DECREASE_CART_ITEM,
  SHOW_CART,
  HIDE_CART,
  SHOW_OVERLAY,
  HIDE_OVERLAY,
} from "../../../reducer/actions"
import { APP_CONFIG } from "../../../shared/constants"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(APP_CONFIG.CART_STORAGE_KEY, JSON.stringify(state.cart))
    } catch (error) {
      console.warn("Failed to save cart to localStorage:", error)
    }
  }, [state.cart])

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id })
  }

  const increaseCartItem = (id) => {
    dispatch({ type: INCREASE_CART_ITEM, payload: id })
  }

  const decreaseCartItem = (id) => {
    dispatch({ type: DECREASE_CART_ITEM, payload: id })
  }

  const addToCart = (amount, item) => {
    dispatch({ type: ADD_TO_CART, payload: { amount, item } })
  }

  const showSidebar = () => {
    dispatch({ type: SHOW_SIDEBAR })
  }

  const hideSidebar = () => {
    dispatch({ type: HIDE_SIDEBAR })
  }

  const showCart = () => {
    dispatch({ type: SHOW_CART })
  }

  const hideCart = () => {
    dispatch({ type: HIDE_CART })
  }

  const showImageOverlay = () => {
    dispatch({ type: SHOW_OVERLAY })
  }

  const hideImageOverlay = () => {
    dispatch({ type: HIDE_OVERLAY })
  }

  useEffect(() => {
    const readScreenWidth = () => {
      dispatch({ type: READ_SCREENWIDTH, payload: window.innerWidth })
    }
    window.addEventListener("resize", readScreenWidth)
    return () => window.removeEventListener("resize", readScreenWidth)
  }, [])

  return (
    <CartContext.Provider
      value={{
        state,
        showSidebar,
        hideSidebar,
        addToCart,
        removeItem,
        increaseCartItem,
        decreaseCartItem,
        showCart,
        hideCart,
        showImageOverlay,
        hideImageOverlay,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return context
}

// Legacy export for backward compatibility
export const useGlobalContext = useCart


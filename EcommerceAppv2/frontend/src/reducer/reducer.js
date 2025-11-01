import {
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  SHOW_CART,
  HIDE_CART,
  ADD_TO_CART,
  REMOVE_ITEM,
  INCREASE_CART_ITEM,
  DECREASE_CART_ITEM,
  GET_TOTAL_CART,
  READ_SCREENWIDTH,
  PROCESS_CHECKOUT,
  CHECK_STOCK,
  UPDATE_STOCK,
} from "./actions"
import { APP_CONFIG } from "../shared/constants"

const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_SIDEBAR:
      return { ...state, showSidebar: true }
    case HIDE_SIDEBAR:
      return { ...state, showSidebar: false }
    case SHOW_OVERLAY:
      // Only allow for overlay to show above breakpoint screen width
      if (state.screenWidth < APP_CONFIG.SCREEN_WIDTH_BREAKPOINT + 1) return state
      return { ...state, showingOverlay: true }
    case HIDE_OVERLAY:
      return { ...state, showingOverlay: false }
    case SHOW_CART:
      return { ...state, showingCart: true }
    case HIDE_CART:
      return { ...state, showingCart: false }
    case ADD_TO_CART: {
      const { item: newItem, amount } = action.payload
      const existingItem = state.cart.find((item) => item.id === newItem.id)

      let updatedCart
      if (existingItem) {
        // Si el item ya existe, actualizamos su cantidad
        updatedCart = state.cart.map((item) =>
          item.id === newItem.id
            ? { ...item, amount: item.amount + amount }
            : item
        )
      } else {
        // Si es un item nuevo, lo agregamos al carrito con su cantidad
        updatedCart = [...state.cart, { ...newItem, amount }]
      }

      // Calculamos el tamaño total del carrito
      const newTotalSize = updatedCart.reduce(
        (total, item) => total + item.amount,
        0
      )

      return {
        ...state,
        cart: updatedCart,
        totalCartSize: newTotalSize,
      }
    }
    // --- NUEVA LÓGICA ---
    case INCREASE_CART_ITEM: {
      const updatedCart = state.cart.map((item) => {
        if (item.id === action.payload) {
          // Aquí podrías añadir una comprobación contra el stock si quisieras
          return { ...item, amount: item.amount + 1 }
        }
        return item
      })
      const newTotalSize = updatedCart.reduce((total, item) => total + item.amount, 0)
      return { ...state, cart: updatedCart, totalCartSize: newTotalSize }
    }
    case DECREASE_CART_ITEM: {
      let tempCart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 }
        }
        return item
      })
      // Si la cantidad llega a 0, filtramos el producto fuera del carrito.
      const updatedCart = tempCart.filter((item) => item.amount > 0)
      const newTotalSize = updatedCart.reduce((total, item) => total + item.amount, 0)
      return { ...state, cart: updatedCart, totalCartSize: newTotalSize }
    }
    case REMOVE_ITEM: {
      // Filtramos el carrito buscando la propiedad 'id'
      const newCart = state.cart.filter(
        (item) => item.id !== action.payload
      )

      // Recalculamos el tamaño total del carrito después de eliminar el item
      const newTotalSize = newCart.reduce(
        (total, item) => total + item.amount,
        0
      )

      return {
        ...state,
        cart: newCart,
        totalCartSize: newTotalSize,
      }
    }

    case GET_TOTAL_CART:
      const totalCartCount = state.cart.reduce((total, currentItem) => {
        return total + currentItem.amount
      }, 0)
      return { ...state, totalCartSize: totalCartCount }
    case READ_SCREENWIDTH:
      return { ...state, screenWidth: action.payload }
    case PROCESS_CHECKOUT:
      const updatedStock = state.cart.reduce((acc, item) => {
        acc[item.productId] = (acc[item.productId] || 0) - item.amount
        return acc
      }, {})
      return {
        ...state,
        stock: { ...state.stock, ...updatedStock },
        cart: [],
        totalCartSize: 0
      }
    case CHECK_STOCK:
      const stockAvailable = action.payload.every(item => {
        return state.stock?.[item.productId] >= item.amount
      })
      return { ...state, stockAvailable }

    case UPDATE_STOCK:
      const newStock = { ...state.stock || {} }
      action.payload.forEach(item => {
        newStock[item.productId] = (newStock[item.productId] || 0) - item.amount
      })
      return { ...state, stock: newStock }
    default:
      return state
  }
}

export default reducer
// App Configuration Constants
export const APP_CONFIG = {
  MIN_QUANTITY: 0,
  MAX_QUANTITY: 999,
  CART_STORAGE_KEY: 'ecommerce_cart',
  SCREEN_WIDTH_BREAKPOINT: 768,
}

// API Configuration
export const API_CONFIG = {
  SERVER_URL: 'http://localhost:8080',
  API_BASE_PATH: '/api',
  ENDPOINTS: {
    PRODUCTS: '/productos',
    AUTH: {
      BASE: '/auth',
      LOGIN: '/auth/login',
      REGISTER: '/auth/register'
    }
  },
  CLIENT_URL: 'http://localhost:5173'
}

// ARIA Labels for Accessibility
export const ARIA_LABELS = {
  INCREASE_QUANTITY: 'Increase quantity',
  DECREASE_QUANTITY: 'Decrease quantity',
  ADD_TO_CART: 'Add to cart',
  QUANTITY_INPUT: 'Product quantity',
  REMOVE_FROM_CART: 'Remove item from cart',
}

// Validation Messages
export const VALIDATION_MESSAGES = {
  MIN_QUANTITY_ERROR: 'Quantity must be at least 1',
  MAX_QUANTITY_ERROR: 'Maximum quantity exceeded',
  ADD_TO_CART_SUCCESS: 'Product added to cart successfully',
}

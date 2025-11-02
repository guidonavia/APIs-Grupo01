import api from '../../../config/axios';

export const cartService = {
  // Get user's cart
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  // Add item to cart
  addToCart: async (item) => {
    const response = await api.post('/cart', item);
    return response.data;
  },

  // Update cart item
  updateCartItem: async (itemId, quantity) => {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
  },

  // Clear cart
  clearCart: async () => {
    const response = await api.delete('/cart');
    return response.data;
  }
};
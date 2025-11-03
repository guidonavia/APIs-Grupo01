import api from "../../../config/axios";
import { API_CONFIG } from "../../../shared/constants";

export const productService = {
  // Get all products
  getAllProducts: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.PRODUCTS);
    return response.data;
  },

  // Get a single product by ID
  getProductById: async (id) => {
    const response = await api.get(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);
    return response.data;
  },

  // Create a new product
  createProduct: async (productData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.PRODUCTS, productData);
    return response.data;
  },

  // Update a product
  updateProduct: async (id, productData) => {
    const response = await api.put(
      `${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`,
      productData
    );
    return response.data;
  },

  // Delete a product
  deleteProduct: async (id) => {
    const response = await api.delete(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);
    return response.data;
  },
  // Get all categories
  getAllCategories: async () => {
    const response = await api.get("/categorias");
    return response.data;
  },

  // Create a checkout / sale record in the backend. Payload should be:
  // { usuarioId: number, items: [{ productoId: number, cantidad: number }] }
  checkout: async (payload) => {
    const response = await api.post("/checkout", payload);
    return response.data;
  },
};

export default productService;

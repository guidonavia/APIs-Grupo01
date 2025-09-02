// src/App.jsx
import React from 'react';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  return (
    <CartProvider>
      <h1>Mi tienda</h1>
      <Cart />
      <ProductList />
    </CartProvider>
  );
};

export default App;


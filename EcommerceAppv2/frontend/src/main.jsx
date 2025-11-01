import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./shared/styles/index.css";
import { CartProvider } from "./features/cart/context/CartContext";
import { AuthProvider } from "./features/user/context/AuthContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


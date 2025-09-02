import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

const CartComponent = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  } = useContext(CartContext);

  // Productos de ejemplo para simular
  const sampleProducts = [
    { id: 1, name: "iPhone 15", price: 999, image: "📱" },
    { id: 2, name: "MacBook Pro", price: 2499, image: "💻" },
    { id: 3, name: "AirPods Pro", price: 249, image: "🎧" },
  ];

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      // Si ya existe, actualizar cantidad
      removeFromCart(product.id);
      addToCart({ ...product, quantity: (existingItem.quantity || 1) + 1 });
    } else {
      addToCart({ ...product, quantity: 1 });
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🛒 Carrito de Compras</h1>

      {/* Productos disponibles */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Productos Disponibles</h2>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {sampleProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center",
                minWidth: "150px",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                {product.image}
              </div>
              <h3>{product.name}</h3>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#007bff",
                }}
              >
                ${product.price}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Carrito */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Tu Carrito ({getCartItemsCount()} productos)</h2>
        {cart.length === 0 ? (
          <p style={{ color: "#666" }}>El carrito está vacío</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  border: "1px solid #eee",
                  marginBottom: "10px",
                  borderRadius: "4px",
                }}
              >
                <div>
                  <span style={{ fontSize: "20px", marginRight: "10px" }}>
                    {item.image}
                  </span>
                  <strong>{item.name}</strong>
                  <span style={{ marginLeft: "10px", color: "#666" }}>
                    Cantidad: {item.quantity || 1}
                  </span>
                </div>
                <div>
                  <span style={{ marginRight: "15px", fontWeight: "bold" }}>
                    ${item.price * (item.quantity || 1)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "4px",
              }}
            >
              <h3>Total: ${getCartTotal()}</h3>
              <button
                onClick={clearCart}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Finalizar Compra
              </button>
              <button
                onClick={clearCart}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartComponent;

// src/CartUI.jsx
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function CartUI() {
  const { cart, addToCart, removeFromCart, clearCart, total } = useContext(CartContext);

  // Simulación de productos disponibles
  const productos = [
    { id: 1, nombre: "Producto A", precio: 100 },
    { id: 2, nombre: "Producto B", precio: 200 },
    { id: 3, nombre: "Producto C", precio: 150 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">🛒 Carrito de Compras</h1>

      {/* Lista de productos */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {productos.map((prod) => (
          <div key={prod.id} className="p-4 bg-white rounded-xl shadow-md flex flex-col items-center">
            <h2 className="text-lg font-semibold">{prod.nombre}</h2>
            <p className="text-gray-600">${prod.precio}</p>
            <button
              onClick={() => addToCart(prod)}
              className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
            >
              Agregar
            </button>
          </div>
        ))}
      </div>

      {/* Carrito */}
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Tu carrito</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">El carrito está vacío</p>
        ) : (
          <ul className="space-y-3">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>
                  {item.nombre} x {item.cantidad}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-2 py-1 bg-green-400 text-white rounded hover:bg-green-500"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Total */}
        <div className="mt-6 flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>${total}</span>
        </div>

        {/* Botón limpiar */}
        <button
          onClick={clearCart}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}

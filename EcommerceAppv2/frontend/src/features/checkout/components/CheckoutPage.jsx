import styled from "styled-components";
import { useCart } from "../../../features/cart/context/CartContext";
import Button from "../../../shared/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Plus, Minus } from "../../../shared/components/ui";
import { productService } from "../../products/services/productService";
import { useAuth } from "../../user/context/AuthContext";

const CheckoutPage = () => {
  // Obtenemos las nuevas funciones del contexto
  const { state, removeItem, increaseCartItem, decreaseCartItem } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Si el carrito está vacío y se intenta acceder a esta página, redirigir al inicio.
    if (state.cart.length === 0) {
      navigate("/");
    }
  }, [state.cart, navigate]);

  const calculateTotal = () => {
    return state.cart
      .reduce((total, item) => {
        const price = item.isOnSale
          ? item.precio * (1 - item.salePercent)
          : item.precio;
        return total + price * item.amount;
      }, 0)
      .toFixed(2);
  };

  // Handlers for quantity buttons with debug logs
  const handleIncreaseClick = (item) => {
    console.debug("[Checkout] increase click", {
      id: item.id,
      currentAmount: item.amount,
    });
    try {
      increaseCartItem(item.id);
    } catch (err) {
      console.error("[Checkout] error increasing item", err);
    }
  };

  const handleDecreaseClick = (item) => {
    console.debug("[Checkout] decrease click", {
      id: item.id,
      currentAmount: item.amount,
    });
    try {
      decreaseCartItem(item.id);
    } catch (err) {
      console.error("[Checkout] error decreasing item", err);
    }
  };

  const handleCheckout = async () => {
    try {
      // Guard: require authenticated user before checkout
      if (!user) {
        console.warn(
          "[Checkout] attempt to checkout without authenticated user"
        );
        alert("Debes iniciar sesión antes de confirmar la compra.");
        navigate("/login");
        return;
      }
      if (!state.cart || state.cart.length === 0) {
        alert("El carrito está vacío.");
        return;
      }

      // 1) Fetch latest product data in parallel to validate stock (reduce race windows)
      const latestProducts = await Promise.all(
        state.cart.map((item) => productService.getProductById(item.id))
      );

      // 2) Find any insufficient-stock items
      const insufficient = [];
      latestProducts.forEach((prod, idx) => {
        const cartItem = state.cart[idx];
        if (!prod) {
          insufficient.push({ item: cartItem, available: 0 });
          return;
        }
        if (prod.stock < cartItem.amount) {
          insufficient.push({ item: cartItem, available: prod.stock });
        }
      });

      if (insufficient.length > 0) {
        // Build helpful message for the user
        const details = insufficient
          .map(
            (i) =>
              `${i.item.nombre} — disponibles: ${i.available}, en tu carrito: ${i.item.amount}`
          )
          .join("\n");
        alert(
          `No hay stock suficiente para los siguientes productos:\n${details}`
        );
        return;
      }

      // 3) Prepare payload for backend /checkout endpoint
      // payload format specified by the backend:
      // { usuarioId: number, items: [{ productoId: number, cantidad: number }] }
      const payload = {
        items: state.cart.map((it) => ({
          productoId: it.id,
          cantidad: it.amount,
        })),
      };

      console.debug("[Checkout] payload prepared for /checkout", payload);
      // Log payload and auth context for debugging
      console.debug("[Checkout] auth user:", user);
      console.debug("[Checkout] payload prepared for /checkout", payload);
      console.debug(
        "[Checkout] token present:",
        !!localStorage.getItem("token")
      );

      // Call backend checkout endpoint which should validate stock and persist the sale
      // (and ideally update product stock server-side atomically).
      const checkoutResponse = await productService.checkout(payload);
      console.debug("[Checkout] /checkout response:", checkoutResponse);

      // If the call above succeeds, clear the cart locally
      state.cart.forEach((item) => removeItem(item.id));

      alert("¡Compra realizada con éxito!");
      navigate("/");
    } catch (error) {
      // Try to extract backend error details from axios response
      const serverMsg = error?.response?.data || error?.response || null;
      console.error(
        "Error al procesar la compra:",
        error,
        "serverResponse:",
        serverMsg
      );

      // If backend provided a structured message, show it to the user for debugging
      if (serverMsg) {
        // If the server returns an object with message/details, try to show the most useful part
        const friendly =
          serverMsg.message ||
          serverMsg.error ||
          serverMsg.detail ||
          JSON.stringify(serverMsg);
        alert(`Error del servidor al procesar la compra: ${friendly}`);
      } else {
        alert("Hubo un error al procesar tu compra. Revisa la consola.");
      }
    }
  };

  if (state.cart.length === 0) {
    return <div>Redirigiendo...</div>;
  }

  return (
    <CheckoutWrapper>
      <h2>Checkout</h2>
      <div className="checkout-container">
        <div className="order-summary">
          <h3>Resumen del Pedido</h3>
          {state.cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.fotos[0].thumbnail || item.fotos[0].url}
                alt={item.nombre}
              />
              <div className="item-details">
                <p>{item.nombre}</p>
                {/* --- CONTROLES DE CANTIDAD --- */}
                <div className="quantity-controls">
                  <button onClick={() => handleDecreaseClick(item)}>
                    <Minus />
                  </button>
                  <span>{item.amount}</span>
                  <button onClick={() => handleIncreaseClick(item)}>
                    <Plus />
                  </button>
                </div>
                <p className="unit-price">
                  Precio Unitario: $
                  {(item.isOnSale
                    ? item.precio * (1 - item.salePercent)
                    : item.precio
                  ).toFixed(2)}
                </p>
              </div>
              {/* Botón para eliminar el item por completo */}
              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="total">
            <h4>Total</h4>
            <p>${calculateTotal()}</p>
          </div>
        </div>
        <Button func={handleCheckout}>Confirmar Compra</Button>
      </div>
    </CheckoutWrapper>
  );
};

const CheckoutWrapper = styled.div`
  padding: 2rem 4rem;
  max-width: 800px;
  margin: 2rem auto;

  > header {
    padding: 1.5rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    margin-left: -20rem;
    margin-right: 0;
  }

  h2 {
    font-size: 2.4rem;
    margin-bottom: 2rem;
  }

  .checkout-container {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }

  .order-summary {
    margin-bottom: 2rem;
  }

  .cart-item {
    display: flex;
    align-items: center; // Centramos verticalmente
    gap: 1.5rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid hsl(var(--divider));

    &:last-child {
      border-bottom: none;
    }

    img {
      width: 60px;
      height: 60px;
      border-radius: 0.5rem;
      object-fit: cover;
    }

    .item-details {
      flex-grow: 1; // Hacemos que ocupe el espacio disponible
      p {
        font-size: 1.4rem;
        color: hsl(var(--dark-grayish-blue));
        margin: 0.4rem 0;
      }
      p:first-child {
        font-weight: 700;
        color: hsl(var(--black));
      }
    }

    /* --- NUEVOS ESTILOS --- */
    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin: 0.8rem 0;

      button {
        color: hsl(var(--orange));
        display: grid;
        place-items: center;
        &:hover {
          opacity: 0.7;
        }
      }

      span {
        font-weight: 700;
      }
    }

    .remove-btn {
      margin-left: auto; // Empuja el botón a la derecha
      background: none;
      border: none;
      color: hsl(var(--dark-grayish-blue));
      font-size: 1.2rem;
      cursor: pointer;
      &:hover {
        color: hsl(var(--orange));
        text-decoration: underline;
      }
    }
  }

  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid hsl(var(--divider));

    h4 {
      font-size: 1.8rem;
    }

    p {
      font-size: 2rem;
      font-weight: bold;
      color: hsl(var(--orange));
    }
  }
`;

export default CheckoutPage;

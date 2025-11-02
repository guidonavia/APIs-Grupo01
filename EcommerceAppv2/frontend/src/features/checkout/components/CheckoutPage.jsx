import styled from "styled-components"
import { useCart } from "../../../features/cart/context/CartContext"
import Button from "../../../shared/components/ui/Button"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Plus, Minus } from "../../../shared/components/ui"
import { productService } from "../../products/services/productService";

const CheckoutPage = () => {
  // Obtenemos las nuevas funciones del contexto
  const { state, removeItem, increaseCartItem, decreaseCartItem } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    // Si el carrito está vacío y se intenta acceder a esta página, redirigir al inicio.
    if (state.cart.length === 0) {
      navigate("/")
    }
  }, [state.cart, navigate])

  const calculateTotal = () => {
    return state.cart
      .reduce((total, item) => {
        const price = item.isOnSale
          ? item.productPrice * (1 - item.salePercent)
          : item.productPrice
        return total + price * item.amount
      }, 0)
      .toFixed(2)
  }

  const handleCheckout = async () => {
    try {
      // Verify stock availability using backend products API
      for (const item of state.cart) {
        const productInDB = await productService.getProductById(item.id);

        if (productInDB.stock < item.amount) {
          alert(`Lo sentimos, solo quedan ${productInDB.stock} unidades de "${item.productName}".`)
          return
        }
      }

      // Update stock for each item
      for (const item of state.cart) {
        const productInDB = await productService.getProductById(item.id);
        const newStock = productInDB.stock - item.amount;
        await productService.updateProduct(item.id, { ...productInDB, stock: newStock });
      }

      state.cart.forEach((item) => {
        removeItem(item.id)
      })

      alert("¡Compra realizada con éxito!")
      navigate("/")
    } catch (error) {
      console.error("Error al procesar la compra:", error)
      alert("Hubo un error al procesar tu compra. Revisa la consola.")
    }
  }

  if (state.cart.length === 0) {
    return <div>Redirigiendo...</div>
  }

  return (
    <CheckoutWrapper>
      <h2>Checkout</h2>
      <div className="checkout-container">
        <div className="order-summary">
          <h3>Resumen del Pedido</h3>
          {state.cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.images[0].thumbnail || item.images[0].url} alt={item.productName} />
              <div className="item-details">
                <p>{item.productName}</p>
                {/* --- CONTROLES DE CANTIDAD --- */}
                <div className="quantity-controls">
                  <button onClick={() => decreaseCartItem(item.id)}><Minus /></button>
                  <span>{item.amount}</span>
                  <button onClick={() => increaseCartItem(item.id)}><Plus /></button>
                </div>
                <p className="unit-price">
                  Precio Unitario: $
                  {(item.isOnSale
                    ? item.productPrice * (1 - item.salePercent)
                    : item.productPrice
                  ).toFixed(2)}
                </p>
              </div>
              {/* Botón para eliminar el item por completo */}
              <button className="remove-btn" onClick={() => removeItem(item.id)}>Eliminar</button>
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
  )
}

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
`

export default CheckoutPage
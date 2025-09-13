import styled from "styled-components"
import { useGlobalContext } from "../context/context"
import Button from "./Button"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const CheckoutPage = () => {
  const { state, removeItem } = useGlobalContext()
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
      for (const item of state.cart) {
        const response = await fetch(`http://localhost:3001/products/${item.id}`)
        const productInDB = await response.json()

        if (productInDB.stock < item.amount) {
          alert(`Lo sentimos, solo quedan ${productInDB.stock} unidades de "${item.productName}".`)
          return
        }
      }

      for (const item of state.cart) {
        const response = await fetch(`http://localhost:3001/products/${item.id}`)
        const productInDB = await response.json()
        const newStock = productInDB.stock - item.amount

        await fetch(`http://localhost:3001/products/${item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stock: newStock }),
        })
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
              <img src={item.images[0].url} alt={item.productName} />
              <div className="item-details">
                <p>{item.productName}</p>
                <p>Cantidad: {item.amount}</p>
                <p>
                  Precio Unitario: $
                  {(item.isOnSale
                    ? item.productPrice * (1 - item.salePercent)
                    : item.productPrice
                  ).toFixed(2)}
                </p>
              </div>
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
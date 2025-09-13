import styled from "styled-components"
import { useGlobalContext } from "../context/context"
import Button from "./Button"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const CheckoutPage = () => {
  const { state, removeItem } = useGlobalContext()
  const navigate = useNavigate()

  const calculateTotal = () => {
    return state.cart.reduce((total, item) => {
      const price = item.isOnSale 
        ? item.productPrice * item.salePercent 
        : item.productPrice
      return total + (price * item.amount)
    }, 0).toFixed(2)
  }

  const handleCheckout = async () => {
    try {
      // 1. Verificar el stock para CADA producto en el carrito
      for (const item of state.cart) {
        const response = await fetch(`http://localhost:3001/products/${item.id}`)
        const productInDB = await response.json()

        if (productInDB.stock < item.amount) {
          alert(`Lo sentimos, solo quedan ${productInDB.stock} unidades de "${item.productName}".`)
          return // Detiene el proceso si no hay stock de algún producto
        }
      }

      // 2. Si hay stock para todo, actualizar CADA producto en la API
      for (const item of state.cart) {
        const newStock = item.stock - item.amount
        await fetch(`http://localhost:3001/products/${item.id}`, {
          method: 'PATCH', // PATCH actualiza solo los campos que enviamos
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stock: newStock }),
        })
      }
      
      // 3. Limpiar el carrito localmente
      state.cart.forEach(item => {
        removeItem(item.id) // Asegúrate que removeItem usa el id correcto
      })

      alert('¡Compra realizada con éxito!')
      navigate('/')
      
    } catch (error) {
      console.error('Error al procesar la compra:', error)
      alert('Hubo un error al procesar tu compra. Revisa la consola.')
    }
  }

  // ... (el resto del componente se mantiene igual) ...
  // ... existing code ...
  if (state.cart.length === 0) {
    return <div>Procesando...</div>
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
                <p>Precio: ${(item.isOnSale 
                  ? item.productPrice * item.salePercent 
                  : item.productPrice).toFixed(2)}</p>
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

// ... (styled-components se mantienen igual) ...
// ... existing code ...
export default CheckoutPage
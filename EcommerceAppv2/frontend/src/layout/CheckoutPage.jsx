import styled from "styled-components"
import { useGlobalContext } from "../context/context"
import Button from "../shared/components/ui/Button/Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const CheckoutPage = () => {
  const { state, removeItem, checkStock, updateStock } = useGlobalContext()
  const navigate = useNavigate()

  const calculateTotal = () => {
    return state.cart.reduce((total, item) => {
      const price = item.discount > 0
        ? item.precio * (1 - item.discount/100)
        : item.precio
      return total + ((price || 0) * item.amount)
    }, 0).toFixed(2)
  }

const handleCheckout = async () => {
    try {
      // Get products from db.json
      const response = await fetch('http://localhost:5000/products');
      const products = await response.json();
      
      // Check stock for each cart item
      for (const cartItem of state.cart) {
        const product = products.find(p => p.id === cartItem.productId);
        if (!product) {
          alert(`Producto no encontrado: ${cartItem.productName}`);
          return;
        }
        if (product.stock < cartItem.amount) {
          alert(`Lo sentimos, solo hay ${product.stock} unidades disponibles de ${cartItem.productName}`);
          return;
        }
      }

      // Update stock for each product
      for (const cartItem of state.cart) {
        const product = products.find(p => p.id === cartItem.productId);
        await fetch(`http://localhost:5000/products/${product.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stock: product.stock - cartItem.amount
          })
        });
      }
      
      // Clear cart
      state.cart.forEach(item => {
        removeItem(item.productId)
      });

      alert('¡Compra realizada con éxito!')
      navigate('/')
      
    } catch (error) {
      console.error('Error al procesar la compra:', error)
      alert('Hubo un error al procesar tu compra')
    }
  }

  // Añadimos este efecto para manejar carrito vacío
  useEffect(() => {
    if (state.cart.length === 0) {
      navigate('/')
    }
  }, [state.cart, navigate])

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
            <div key={item.productId} className="cart-item">
              <img 
                src={item.imagenes ? item.imagenes[0] : 'placeholder-image.jpg'} 
                alt={item.nombre} 
              />
              <div className="item-details">
                <p>{item.nombre}</p>
                <p>Cantidad: {item.amount}</p>
                <p>Precio: ${((item.discount > 0
                  ? item.precio * (1 - item.discount/100)
                  : item.precio) || 0).toFixed(2)}</p>
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
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: 2.4rem;
    margin-bottom: 2rem;
  }

  .checkout-container {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }

  .order-summary {
    margin-bottom: 2rem;
  }

  .cart-item {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid hsl(var(--divider));

    img {
      width: 60px;
      height: 60px;
      border-radius: 0.5rem;
    }

    .item-details {
      p {
        font-size: 1.4rem;
        color: hsl(var(--dark-grayish-blue));
      }
    }
  }

  .total {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 2px solid hsl(var(--divider));

    h4 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1.8rem;
      font-weight: bold;
      color: hsl(var(--orange));
    }
  }
`

export default CheckoutPage
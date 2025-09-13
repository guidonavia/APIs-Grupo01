import styled from "styled-components"
import { useState } from "react" // Importamos useState
import { Plus, Minus, Cart } from "../icons/index"
import Button from "./Button"
import { useGlobalContext } from "../context/context"

// Recibimos el objeto 'product' como prop
const ProductControls = ({ product }) => {
  // ELIMINAMOS increase/decreaseAmount globales. Usamos un estado LOCAL.
  const { addToCart } = useGlobalContext()
  
  // 1. CADA producto tendrá su propio contador de cantidad.
  const [quantity, setQuantity] = useState(0)

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0))
  }

  return (
    <ControlsWrapper>
      <div className="inner-controls">
        <button onClick={handleDecrease}>
          <Minus />
        </button>
        {/* 2. Mostramos la cantidad LOCAL */}
        <span className="amount">{quantity}</span>
        <button onClick={handleIncrease}>
          <Plus />
        </button>
      </div>
      <Button
        className="cart"
        func={() => {
          // 3. Si la cantidad es mayor a 0, agregamos al carrito y reseteamos el contador local.
          if (quantity > 0) {
            addToCart(quantity, product)
            setQuantity(0) // Opcional: resetear el contador después de agregar
          }
        }}
        color={"#FFFFFF"}
      >
        <Cart />
        Añadir al carrito
      </Button>
    </ControlsWrapper>
  )
}

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .inner-controls {
    background-color: hsl(var(--light-grayish-blue));
    border-radius: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6rem 2.4rem;

    button {
      color: hsl(var(--orange));
      &:hover {
        opacity: 0.7;
      }
    }

    .amount {
      font-weight: 700;
      font-size: 1.6rem;
    }
  }

  .cart {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
  }
`

export default ProductControls
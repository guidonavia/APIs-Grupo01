import styled from "styled-components"
import { Plus, Minus, Cart } from "../icons/index"
import Button from "./Button"
import { useGlobalContext } from "../context/context"

// Recibimos el objeto 'product' como prop
const ProductControls = ({ product }) => {
  const { increaseAmount, decreaseAmount, addToCart, state } =
    useGlobalContext()

  // NOTA: El estado 'amount' es global. Para manejar cantidades por producto,
  // esto necesitaría un refactor más grande. Por ahora, funciona para agregar al carrito.
  const currentAmount = state.amount

  return (
    <ControlsWrapper>
      <div className="inner-controls">
        <button
          onClick={() => {
            decreaseAmount(product.id)
          }}
        >
          <Minus />
        </button>
        <span className="amount">{currentAmount}</span>
        <button
          onClick={() => {
            increaseAmount(product.id)
          }}
        >
          <Plus />
        </button>
      </div>
      <Button
        className="cart"
        func={() => {
          // Usamos el objeto 'product' recibido en lugar de un archivo estático
          if (currentAmount > 0) {
            addToCart(currentAmount, product)
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
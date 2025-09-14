import styled from "styled-components"
import { useState } from "react"
import PropTypes from "prop-types"
import { Plus, Minus, Cart } from "../../../../shared/components/ui/icons/index"
import Button from "../../../../shared/components/ui/Button/Button.jsx"
import { useGlobalContext } from "../../../../context/context.jsx"

const ProductControls = ({ 
  productId,
  productName,
  productDescription,
  productPrice,
  productImages = [],
  discount = 0,
  isCartItem = false,
  amount = 0
}) => {
  const { addToCart } = useGlobalContext()
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
        <span className="amount">{quantity}</span>
        <button onClick={handleIncrease}>
          <Plus />
        </button>
      </div>
      <Button
        className="cart"
        func={() => {
          if (quantity > 0) {
            const cartItem = {
              productId: productId,
              nombre: productName,
              descripcion: productDescription,
              precio: productPrice,
              discount: discount,
              imagenes: productImages
            }
            addToCart(quantity, cartItem)
            setQuantity(0)
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

ProductControls.propTypes = {
  productId: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  productDescription: PropTypes.string,
  productPrice: PropTypes.number.isRequired,
  productImages: PropTypes.arrayOf(PropTypes.string),
  discount: PropTypes.number,
  isCartItem: PropTypes.bool,
  amount: PropTypes.number
}

ProductControls.defaultProps = {
  productDescription: "",
  productImages: [],
  discount: 0,
  isCartItem: false,
  amount: 0
}

export default ProductControls
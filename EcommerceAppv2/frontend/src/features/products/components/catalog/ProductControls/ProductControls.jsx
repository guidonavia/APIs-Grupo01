import styled from "styled-components"
import { useState, useCallback } from "react"
import PropTypes from "prop-types"
import { Plus, Minus, Cart } from "../../../../../shared/components/ui"
import Button from "../../../../../shared/components/ui/Button"
import { useCart } from "../../../../cart/context/CartContext"
import { APP_CONFIG, ARIA_LABELS, VALIDATION_MESSAGES } from "../../../../../shared/constants"

/**
 * ProductControls - Manages quantity selection and cart addition for a product
 * Features:
 * - Local quantity state management
 * - Validation with min/max constraints
 * - Accessibility support (ARIA labels, keyboard navigation)
 * - Disabled states for better UX
 * @param {Object} product - Product object to add to cart
 */
const ProductControls = ({ product }) => {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(APP_CONFIG.MIN_QUANTITY)
  const [error, setError] = useState(null)
  const [isAdding, setIsAdding] = useState(false)

  const handleIncrease = useCallback(() => {
    setError(null)
    setQuantity((prev) => {
      if (prev >= APP_CONFIG.MAX_QUANTITY) {
        setError(VALIDATION_MESSAGES.MAX_QUANTITY_ERROR)
        return prev
      }
      return prev + 1
    })
  }, [])

  const handleDecrease = useCallback(() => {
    setError(null)
    setQuantity((prev) => (prev > APP_CONFIG.MIN_QUANTITY ? prev - 1 : APP_CONFIG.MIN_QUANTITY))
  }, [])

  const handleKeyDown = useCallback((event, action) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      action()
    }
  }, [])

  const handleAddToCart = useCallback(async () => {
    if (quantity <= APP_CONFIG.MIN_QUANTITY) {
      setError(VALIDATION_MESSAGES.MIN_QUANTITY_ERROR)
      return
    }

    setIsAdding(true)
    setError(null)

    try {
      addToCart(quantity, product)
      setQuantity(APP_CONFIG.MIN_QUANTITY)
      setTimeout(() => setIsAdding(false), 300)
    } catch (err) {
      setError("Failed to add product to cart. Please try again.")
      setIsAdding(false)
    }
  }, [quantity, product, addToCart])

  const isDecreaseDisabled = quantity <= APP_CONFIG.MIN_QUANTITY
  const isIncreaseDisabled = quantity >= APP_CONFIG.MAX_QUANTITY
  const isAddToCartDisabled = quantity <= APP_CONFIG.MIN_QUANTITY || isAdding

  return (
    <ControlsWrapper>
      <div className="inner-controls">
        <button
          onClick={handleDecrease}
          onKeyDown={(e) => handleKeyDown(e, handleDecrease)}
          disabled={isDecreaseDisabled}
          aria-label={ARIA_LABELS.DECREASE_QUANTITY}
          aria-disabled={isDecreaseDisabled}
          className={isDecreaseDisabled ? "disabled" : ""}
        >
          <Minus />
        </button>
        <span 
          className="amount" 
          role="status" 
          aria-label={`${ARIA_LABELS.QUANTITY_INPUT}: ${quantity}`}
        >
          {quantity}
        </span>
        <button
          onClick={handleIncrease}
          onKeyDown={(e) => handleKeyDown(e, handleIncrease)}
          disabled={isIncreaseDisabled}
          aria-label={ARIA_LABELS.INCREASE_QUANTITY}
          aria-disabled={isIncreaseDisabled}
          className={isIncreaseDisabled ? "disabled" : ""}
        >
          <Plus />
        </button>
      </div>
      {error && <div className="error-message" role="alert">{error}</div>}
      <Button
        className="cart"
        func={handleAddToCart}
        disabled={isAddToCartDisabled}
        color="#FFFFFF"
        ariaLabel={ARIA_LABELS.ADD_TO_CART}
      >
        <Cart />
        {isAdding ? "Agregando..." : "Añadir al carrito"}
      </Button>
    </ControlsWrapper>
  )
}

ProductControls.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
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
      transition: opacity 0.2s ease, transform 0.1s ease;
      cursor: pointer;
      
      &:hover:not(.disabled) {
        opacity: 0.7;
      }

      &:active:not(.disabled) {
        transform: scale(0.95);
      }

      &:focus-visible {
        outline: 2px solid hsl(var(--orange));
        outline-offset: 2px;
        border-radius: 0.4rem;
      }

      &.disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }

    .amount {
      font-weight: 700;
      font-size: 1.6rem;
      min-width: 3rem;
      text-align: center;
    }
  }

  .error-message {
    color: hsl(0, 70%, 50%);
    font-size: 1.4rem;
    text-align: center;
    margin-top: -1rem;
  }

  .cart {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
  }

  @media (max-width: 768px) {
    .inner-controls {
      padding: 1.2rem 2rem;
    }
  }
`

export default ProductControls


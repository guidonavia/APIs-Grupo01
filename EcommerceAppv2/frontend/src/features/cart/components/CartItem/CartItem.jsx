import styled from "styled-components"
import { Delete } from "../../../../shared/components/ui"
import { useCart } from "../../context/CartContext"
import { ARIA_LABELS } from "../../../../shared/constants"

const CartItem = ({
  id,
  fotos,
  nombre,
  precio,
  amount,
  isOnSale,
  salePercent,
}) => {
  const { removeItem } = useCart()

  const finalUnitPrice = isOnSale
    ? precio * (1 - salePercent)
    : precio

  const totalPrice = finalUnitPrice * amount

  return (
    <CartItemWrapper>
      <div className="img-container">
        <img src={fotos[0].thumbnail || fotos[0].url} alt={nombre} />
      </div>
      <div className="info">
        <p className="name">{nombre}</p>
        <p className="price-details">
          <span>{`$${finalUnitPrice.toFixed(2)} x ${amount}`}</span>
          <span className="total-price">{`$${totalPrice.toFixed(2)}`}</span>
        </p>
      </div>
      <button
        onClick={() => removeItem(id)}
        className="delete-btn"
        aria-label={ARIA_LABELS.REMOVE_FROM_CART}
      >
        <Delete />
      </button>
    </CartItemWrapper>
  )
}

const CartItemWrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  .img-container {
    height: 5rem;
    width: 5rem;
    border-radius: 0.4rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    flex-grow: 1;
    font-size: 1.5rem;
    color: hsl(var(--dark-grayish-blue));

    .name {
      text-transform: capitalize;
      margin-bottom: 0.5rem;
    }

    .price-details {
      display: flex;
      gap: 0.8rem;
    }

    .total-price {
      font-weight: 700;
      color: hsl(var(--black));
    }
  }

  .delete-btn {
    color: hsl(var(--grayish-blue));
    &:hover {
      color: hsl(var(--black));
    }
  }
`

export default CartItem


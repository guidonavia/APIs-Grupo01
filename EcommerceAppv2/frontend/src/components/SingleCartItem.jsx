import styled from "styled-components"
import { Delete } from "../icons"
import { useGlobalContext } from "../context/context"

// Recibimos todas las props del item del carrito
const SingleCartItem = ({
  id,
  images,
  productName,
  productPrice,
  amount,
  isOnSale,
  salePercent,
}) => {
  const { removeItem } = useGlobalContext()

  // --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
  // Calculamos el precio final por unidad, aplicando el descuento si existe.
  const finalUnitPrice = isOnSale
    ? productPrice * (1 - salePercent)
    : productPrice

  // Calculamos el precio total para este item (precio unitario * cantidad)
  const totalPrice = finalUnitPrice * amount

  return (
    <SingleCartItemWrapper>
      <div className="img-container">
        {/* Usamos la primera imagen disponible */}
        <img src={images[0].thumbnail || images[0].url} alt={productName} />
      </div>
      <div className="info">
        <p className="name">{productName}</p>
        <p className="price-details">
          {/* Mostramos el precio unitario y la cantidad */}
          <span>{`$${finalUnitPrice.toFixed(2)} x ${amount}`}</span>
          {/* Mostramos el precio total para esta línea */}
          <span className="total-price">{`$${totalPrice.toFixed(2)}`}</span>
        </p>
      </div>
      <button onClick={() => removeItem(id)} className="delete-btn">
        <Delete />
      </button>
    </SingleCartItemWrapper>
  )
}

const SingleCartItemWrapper = styled.li`
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

export default SingleCartItem
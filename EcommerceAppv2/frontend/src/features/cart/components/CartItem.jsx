import styled from "styled-components"
import PropTypes from "prop-types"

const CartItem = ({ 
  productName, 
  productPrice, 
  amount, 
  imageUrl 
}) => {
  return (
    <ItemWrapper>
      <img src={imageUrl} alt={productName} />
      <div className="item-info">
        <p className="name">{productName}</p>
        <p className="price">
          ${productPrice.toFixed(2)} x {amount}{" "}
          <span>${(productPrice * amount).toFixed(2)}</span>
        </p>
      </div>
    </ItemWrapper>
  )
}

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 1rem;

  img {
    width: 5rem;
    height: 5rem;
    border-radius: 0.4rem;
    object-fit: cover;
  }

  .item-info {
    flex: 1;
    
    .name {
      font-size: 1.6rem;
      color: hsl(var(--dark-grayish-blue));
      margin-bottom: 0.4rem;
    }

    .price {
      font-size: 1.6rem;
      color: hsl(var(--dark-grayish-blue));

      span {
        font-weight: 700;
        color: hsl(var(--black));
        margin-left: 0.5rem;
      }
    }
  }
`

CartItem.propTypes = {
  productName: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired
}

export default CartItem
import styled from "styled-components"
import PropTypes from "prop-types"
import ProductControls from "./ProductControls"


const ProductInfo = ({
  productId,
  productName,
  productDescription,
  productPrice,
  originalPrice,
  discount,
  isCartItem = false,
  amount,
  productImages = [],
}) => {
  const isOnSale = discount > 0;
  const salePercent = isOnSale ? (100 - discount) / 100 : 1;
  return (
    <InfoWrapper isCartItem={isCartItem}>
      {isCartItem ? (
        <div className="cart-item">
          <img src={productImages[0]} alt={productName} />
          <div className="item-info">
            <p className="name">{productName}</p>
            <p className="price">
              ${productPrice.toFixed(2)} x {amount}{" "}
              <span>${(productPrice * amount).toFixed(2)}</span>
            </p>
          </div>
          <ProductControls 
            productId={productId}
            productName={productName}
            productPrice={productPrice}
            productImages={productImages}
            isCartItem={true}
            amount={amount}
          />
        </div>
      ) : (
        <>
          <div className="inner-info">
            <h2 className="company-name">Ecommerce</h2>
            <p className="product-name">{productName}</p>
            <p className="product-description">{productDescription}</p>
            <div className="pricing">
              <p className="price">
                $
                {isOnSale
                  ? (productPrice * salePercent).toFixed(2)
                  : productPrice.toFixed(2)}
              </p>
              {isOnSale && (
                <p className="percent">{discount}% OFF</p>
              )}
              {isOnSale && (
                <p className="original-price">${originalPrice.toFixed(2)}</p>
              )}
            </div>
          </div>
          <ProductControls 
            productId={productId}
            productName={productName}
            productPrice={productPrice}
            productImages={productImages}
          />
        </>
      )}
    </InfoWrapper>
  )
}

const InfoWrapper = styled.section`
  padding: ${props => props.isCartItem ? '1rem' : '2.4rem'};
  
  .cart-item {
    display: flex;
    align-items: center;
    gap: 1.6rem;

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
        color: #68707d;
        margin-bottom: 0.4rem;
      }

      .price {
        font-size: 1.6rem;
        color: #68707d;

        span {
          font-weight: 700;
          color: #1d2025;
          margin-left: 0.5rem;
        }
      }
    }
  }

  @media screen and (min-width: 600px) {
    padding: 2.4rem 4rem;
  }

  @media screen and (min-width: 768px) {
    margin: 0 auto;
  }

  .inner-info {
    margin-bottom: 1.6rem;

    .company-name {
      font-size: 1.2rem;
      color: hsl(var(--orange));
      margin-bottom: 2rem;
    }

    .product-name {
      font-size: 2.8rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }

    .product-description {
      font-size: 1.5rem;
      color: hsl(var(--dark-grayish-blue));
      line-height: 2.5rem;
      margin-bottom: 2.4rem;
    }

    .pricing {
      display: grid;
      align-items: center;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 1fr;
      gap: 1.6rem;

      .price {
        font-size: 2.8rem;
        font-weight: 700;
        grid-column: 1 / 2;
      }

      .percent {
        color: hsl(var(--orange));
        background-color: hsl(var(--pale-orange));
        font-size: 1.6rem;
        font-weight: 700;
        padding: 0.7rem 0.8rem;
        border-radius: 0.6rem;
        grid-column: 2 / 3;
        text-align: center;
      }

      .original-price {
        text-decoration: line-through;
        font-size: 1.6rem;
        font-weight: 700;
        color: hsl(var(--grayish-blue));
        grid-column: 4 / 5;
      }
    }
  }

  @media screen and (min-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    flex-basis: 44.5rem;

    .inner-info {
      .company-name {
        font-size: 1.3rem;
        line-height: 1.6rem;
        margin-bottom: 2.4rem;
      }

      .product-name {
        font-size: 4.4rem;
        line-height: 4.8rem;
        margin-bottom: 3.2rem;
      }

      .product-description {
        font-size: 1.6rem;
        line-height: 2.6rem;
      }

      .pricing {
        grid-template-rows: 1fr 1fr;
        gap: 0 1.6rem;
        .price {
          grid-column: 1 / 2;
          grid-row: 1;
        }

        .percent {
          justify-self: start;
        }

        .original-price {
          grid-column: 1 / 2;
          grid-row: 2;
        }
      }
    }
  }
`

ProductInfo.propTypes = {
  productId: PropTypes.string,
  productName: PropTypes.string,
  productDescription: PropTypes.string,
  productPrice: PropTypes.number,
  originalPrice: PropTypes.number,
  discount: PropTypes.number,
  isCartItem: PropTypes.bool,
  amount: PropTypes.number,
  productImages: PropTypes.arrayOf(PropTypes.string)
}

ProductInfo.defaultProps = {
  productName: "N/A",
  productDescription: "No description available.",
  productPrice: 0,
  originalPrice: 0,
  discount: 0,
  isCartItem: false,
  amount: 1,
  productImages: []
}

export default ProductInfo
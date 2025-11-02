import styled from "styled-components"
import ProductControls from "../ProductControls/ProductControls"

const ProductInfo = ({ product, showCounter }) => {
  if (!product) return null

  const {
    companyName,
    productName,
    productDescription,
    productPrice,
    isOnSale,
    salePercent,
  } = product

  // Defensive parsing: accept productPrice or price, ensure numbers
  const rawPrice = productPrice ?? product?.price ?? 0
  const priceNum = Number(rawPrice) || 0
  const salePct = typeof salePercent === 'number' ? salePercent : Number(salePercent) || 0

  const finalPrice = isOnSale ? priceNum * (1 - salePct) : priceNum

  return (
    <InfoWrapper>
      <div className="inner-info">
        <span className="company-name">{companyName}</span>
        <h1 className="product-name">{productName}</h1>
        <p className="product-description">{productDescription}</p>
        <div className="price-wrapper">
          <span className="final-price">${finalPrice.toFixed(2)}</span>
          {isOnSale && (
            <span className="sale-percent">{(salePct * 100).toFixed(0)}%</span>
          )}
          {isOnSale && (
            <span className="original-price">${priceNum.toFixed(2)}</span>
          )}
        </div>
      </div>
      {showCounter && <ProductControls product={product} />}
      
    </InfoWrapper>
  )
}

const InfoWrapper = styled.div`
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;

  .company-name {
    color: hsl(var(--orange));
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 1.5px;
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
    display: block;
  }

  .product-name {
    font-size: 2.8rem;
    line-height: 1.2;
    margin-bottom: 1.6rem;
  }

  .product-description {
    color: hsl(var(--dark-grayish-blue));
    line-height: 1.6;
    margin-bottom: 2.4rem;
  }

  .price-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.6rem;
    margin-bottom: 2.4rem;
  }

  .final-price {
    font-size: 2.8rem;
    font-weight: 700;
  }

  .sale-percent {
    background-color: hsl(var(--pale-orange));
    color: hsl(var(--orange));
    padding: 0.4rem 0.8rem;
    border-radius: 0.6rem;
    font-weight: 700;
  }

  .original-price {
    color: hsl(var(--grayish-blue));
    text-decoration: line-through;
    font-weight: 700;
    width: 100%;
  }
`

export default ProductInfo


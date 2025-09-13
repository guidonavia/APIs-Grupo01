import styled from "styled-components"
import ProductControls from "./ProductControls"

// Recibe el objeto 'product' completo
const ProductInfo = ({ product }) => {
  // Desestructuramos las propiedades para mostrarlas
  const {
    companyName,
    productName,
    productDescription,
    productPrice,
    isOnSale,
    salePercent,
  } = product

  const finalPrice = isOnSale ? productPrice * (1 - salePercent) : productPrice

  return (
    <InfoWrapper>
      <div className="inner-info">
        <span className="company-name">{companyName}</span>
        <h1 className="product-name">{productName}</h1>
        <p className="product-description">{productDescription}</p>
        <div className="price-wrapper">
          <span className="final-price">${finalPrice.toFixed(2)}</span>
          {isOnSale && (
            <span className="sale-percent">{salePercent * 100}%</span>
          )}
          {isOnSale && (
            <span className="original-price">${productPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
      {/* Pasamos el objeto 'product' completo a ProductControls */}
      <ProductControls product={product} />
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
import styled from "styled-components"
import ImageCarousel from "../components/ImageCarousel"
import ProductInfo from "../components/ProductInfo"

// El componente recibe 'productData' como prop
const Product = ({ productData }) => {
  // Ya no desestructuramos aquí. Pasamos el objeto completo.
  return (
    <ProductWrapper>
      {/* ImageCarousel solo necesita las imágenes */}
      <ImageCarousel images={productData.images} />
      {/* ProductInfo recibe el objeto de datos COMPLETO como un solo prop 'product' */}
      <ProductInfo product={productData} />
    </ProductWrapper>
  )
}

const ProductWrapper = styled.article`
  border: 1px solid hsl(var(--divider));
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1rem 2rem -1rem hsl(var(--black) / 0.1);
  max-width: 350px;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  @media screen and (min-width: 1000px) {
    gap: 2.4rem;
    padding: 2rem;
  }
`

export default Product
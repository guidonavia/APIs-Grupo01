import styled from "styled-components"
import ImageCarousel from "../components/ImageCarousel"
import ProductInfo from "../components/ProductInfo"

const Product = ({ productData }) => {
  return (
    <ProductWrapper>
      <ImageCarousel images={productData.images} />
      <ProductInfo product={productData} />
    </ProductWrapper>
  )
}

// --- ESTILOS SIMPLIFICADOS ---
const ProductWrapper = styled.article`
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
  }
`

export default Product
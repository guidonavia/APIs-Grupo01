import styled from "styled-components"
import ImageCarousel from "../components/ImageCarousel"
import ProductInfo from "../components/ProductInfo"
import { useNavigate } from "react-router-dom"


const Product = ({ productData }) => {
  const navigate = useNavigate();
  
  return (
    <ProductWrapper>
      <ImageCarousel images={productData.images} />
      <ProductInfo product={productData} />
      <button className="btn-verMas" onClick={() => navigate(`/products/${productData.id}`)}>
      Ver Producto
      </button>
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
  .btn-verMas {
    margin: 1rem;
    padding: 0.6rem 1.2rem;
    background-color: #ff9500ff;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #b35f00ff;
  }
}
`

export default Product
import styled from "styled-components";
import ImageCarousel from "../../ImageCarousel";
import ProductInfo from "../ProductInfo/ProductInfo";
import ProductControls from "../ProductControls/ProductControls";
import { Link } from "react-router-dom";

const ProductCard = ({ productData }) => {
  return (
    <ProductWrapper>
      <Link
        to={`/products/${productData.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ImageCarousel fotos={productData.fotos} />
        <ProductInfo product={productData} showCounter={false} />
        <CategoryTag>{productData.categoryName}</CategoryTag>
      </Link>
    </ProductWrapper>
  );
};


const ProductWrapper = styled.article`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
  max-width: 410px;
  max-height: 900px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.14);
  }
`;

const CategoryTag = styled.div`
  background: linear-gradient(90deg, hsl(25, 90%, 55%), hsl(15, 90%, 45%));
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0 0 10px 10px;
  padding: 0.5rem 1rem;
  text-align: center;
  margin-top: 0.5rem;
`;

export default ProductCard;

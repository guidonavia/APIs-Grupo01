import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../shared/components/layout/Footer/Footer";
import ProductInfo from "../features/products/components/catalog/ProductCard/ProductInfo";
import { useGlobalContext } from "../context/context";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, state } = useGlobalContext();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.imagenes[0]);
      });
  }, [id]);

  useEffect(() => {
    if (product?.categoria) {
      fetch(`http://localhost:5000/products`)
        .then((res) => res.json())
        .then((allProducts) => {
          const filtered = allProducts.filter(
            (p) => p.categoria === product.categoria && p.id !== product.id
          );
          setRelatedProducts(filtered);
        });
    }
  }, [product]);

  if (!product) return <p>Cargando...</p>;

  return (
    <>
      <Wrapper>
        <MainSection>
          <ImageGallery>
            <MainImage src={mainImage} alt={product.nombre} />
            <Thumbnails>
              {product.imagenes.map((img, idx) => (
                <Thumb
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  onClick={() => setMainImage(img)}
                  active={mainImage === img}
                />
              ))}
            </Thumbnails>
          </ImageGallery>

          <ProductInfo
            productId={product.id}
            companyName={product.marca || "Ecommerce"}
            productName={product.nombre}
            productDescription={product.descripcion}
            productPrice={product.precio}
            isOnSale={product.discount > 0}
            salePercent={(100 - product.discount) / 100}
          />
        </MainSection>

        <BottomSection>
          <Related>
            <h3>Productos relacionados</h3>
            <GridContainer>
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img src={product.imagenes[0]} alt={product.nombre} />
                  <div className="product-info">
                    <h4>{product.nombre}</h4>
                    <span className="price">${product.precio}</span>
                    {product.discount && (
                      <>
                        <span className="discount">{product.discount}% OFF</span>
                        <span className="original-price">${product.originalPrice}</span>
                      </>
                    )}
                  </div>
                </ProductCard>
              ))}
            </GridContainer>
          </Related>
        </BottomSection>
      </Wrapper>
      <Footer />
    </>
  );
};

export default ProductPage;

/* ===== Styled Components ===== */
const Wrapper = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
`;

const MainSection = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ImageGallery = styled.div`
  flex: 2;
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Thumb = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 2px solid
    ${(props) => (props.active ? "hsl(26, 100%, 55%)" : "#ccc")};
  border-radius: 5px;
  cursor: pointer;
`;



const BottomSection = styled.div`
  margin-top: 2rem;
`;

const Related = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 3rem;
    font-style: bold;
    color: #333;
    margin-bottom: 1.5rem;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.8rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .product-info {
    padding: 1rem;

    h4 {
      font-size: 1rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .price {
      font-size: 1.5rem;
      color: #333;
      font-weight: 500;
    }

    .discount {
      color: #00a650;
      font-size: 0.9rem;
      margin-left: 0.5rem;
    }

    .original-price {
      color: #999;
      font-size: 0.9rem;
      text-decoration: line-through;
      display: block;
    }
  }
`;

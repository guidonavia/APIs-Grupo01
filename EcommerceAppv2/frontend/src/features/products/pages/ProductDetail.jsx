import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductInfo from "../components/catalog/ProductInfo/ProductInfo";
import { API_CONFIG } from "../../../shared/constants";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(`${API_CONFIG.PRODUCTS_API}/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch product: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setMainImage(data.images?.[0]?.url || "");
      })
      .catch((err) => {
        setError(err.message || "Failed to load product");
        console.error("Error fetching product:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (product?.category) {
      setLoadingRelated(true);
      fetch(API_CONFIG.PRODUCTS_API)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch related products");
          }
          return res.json();
        })
        .then((allProducts) => {
          const filtered = allProducts.filter(
            (p) => p.category === product.category && p.id !== product.id
          );
          setRelatedProducts(filtered);
        })
        .catch((err) => {
          console.error("Error fetching related products:", err);
        })
        .finally(() => {
          setLoadingRelated(false);
        });
    }
  }, [product]);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <p>Cargando producto...</p>
      </LoadingContainer>
    );
  }

  if (error || !product) {
    return (
      <ErrorContainer>
        <h2>Error al cargar el producto</h2>
        <p>{error || "Producto no encontrado"}</p>
        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </ErrorContainer>
    );
  }

  return (
    <>
      <Wrapper>
        <MainSection>
          <ImageGallery>
            <MainImage 
              src={mainImage || product.images?.[0]?.url || ""} 
              alt={product.productName || "Product image"} 
              loading="lazy"
            />
            <Thumbnails>
              {product.images?.map((img, idx) => (
                <Thumb
                  key={idx}
                  src={img.url}
                  alt={`${product.productName} thumbnail ${idx + 1}`}
                  onClick={() => setMainImage(img.url)}
                  active={(mainImage === img.url).toString()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setMainImage(img.url);
                    }
                  }}
                />
              ))}
            </Thumbnails>
          </ImageGallery>

          {product && <ProductInfo product={product} showCounter={true} />}
        </MainSection>

        <BottomSection>
          <Related>
            <h3>Productos relacionados</h3>
            {loadingRelated ? (
              <LoadingText>Cargando productos relacionados...</LoadingText>
            ) : relatedProducts.length > 0 ? (
              <GridContainer>
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    onClick={() => navigate(`/products/${relatedProduct.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate(`/products/${relatedProduct.id}`);
                      }
                    }}
                  >
                    <img 
                      src={relatedProduct.images?.[0]?.url || ""} 
                      alt={relatedProduct.productName || "Product image"} 
                      loading="lazy"
                    />
                    <div className="product-info">
                      <h4>{relatedProduct.productName}</h4>
                      <span className="price">${relatedProduct.productPrice?.toFixed(2) || "0.00"}</span>
                      {relatedProduct.isOnSale && (
                        <>
                          <span className="discount">
                            {relatedProduct.salePercent * 100}% OFF
                          </span>
                          <span className="original-price">
                            ${relatedProduct.productPrice?.toFixed(2) || "0.00"}
                          </span>
                        </>
                      )}
                    </div>
                  </ProductCard>
                ))}
              </GridContainer>
            ) : (
              <EmptyMessage>No hay productos relacionados disponibles</EmptyMessage>
            )}
          </Related>
        </BottomSection>
      </Wrapper>
    </>
  );
};

export default ProductPage;

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
  border: 2px solid ${(props) => (props.active === "true" ? "hsl(26, 100%, 55%)" : "#ccc")};
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
    font-weight: bold;
    color: #333;
    margin-bottom: 1.5rem;
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
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:focus-visible {
    outline: 2px solid hsl(var(--orange));
    outline-offset: 2px;
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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 2rem;
`;

const LoadingSpinner = styled.div`
  width: 4rem;
  height: 4rem;
  border: 4px solid hsl(var(--light-grayish-blue));
  border-top-color: hsl(var(--orange));
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 2rem;
  text-align: center;

  h2 {
    color: hsl(var(--very-dark-blue));
    font-size: 2.4rem;
  }

  p {
    color: hsl(var(--dark-grayish-blue));
    font-size: 1.6rem;
  }

  button {
    padding: 1.2rem 2.4rem;
    background-color: hsl(var(--orange));
    color: hsl(var(--white));
    border-radius: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }
`;

const LoadingText = styled.p`
  text-align: center;
  color: hsl(var(--dark-grayish-blue));
  font-size: 1.6rem;
  padding: 2rem;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: hsl(var(--dark-grayish-blue));
  font-size: 1.6rem;
  padding: 2rem;
  font-style: italic;
`;


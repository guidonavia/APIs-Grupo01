import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../shared/components/layout/Footer/Footer";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(0);
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

          <InfoCard>
            <div className="top-content">
              <h1>{product.nombre}</h1>
              <p>{product.descripcion}</p>
            </div>

            <div className="bottom-content">
              <div className="price-section">
                <span className="price">${product.precio}</span>
                <span className="discount">{product.discount}%</span>
                <span className="original-price">${product.originalPrice}</span>
              </div>

              <div className="quantity-cart">
                <div className="quantity">
                  <button onClick={() => setQty(Math.max(qty - 1, 0))}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
                <button className="add-cart">Añadir al carrito</button>
              </div>
            </div>
          </InfoCard>
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

const InfoCard = styled.div`
  flex: 1;
  padding: 1.5rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;

  .top-content {
    h1 {
      color: #333;
      font-size: 4rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    p {
      color: #666;
      line-height: 1.5;
      font-size: 2.5rem;
    }
  }

  .bottom-content {
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;

    .price-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .price {
      font-size: 4rem;
      font-weight: 600;
      color: #333;
    }

    .discount {
      background: #fff0e6;
      color: #ff6b00;
      font-weight: 600;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 2rem;
    }

    .original-price {
      color: #999;
      text-decoration: line-through;
      font-size: 2rem;
      justify: right;
    }

    .quantity-cart {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .quantity {
      display: flex;
      align-items: center;
      background: #f5f5f5;
      border-radius: 4px;
      justify-content: space-between;
      padding: 0.5rem;

      button {
        border: none;
        background: none;
        color: #ff6b00;
        font-size: 2rem;
        font-weight: 600;
        cursor: pointer;
        padding: 0 1rem;

        &:hover {
          color: #ff8533;
        }
      }

      span {
        font-weight: 600;
      }
    }

    button.add-cart {
      width: 100%;
      background: #ff6b00;
      border: none;
      padding: 1rem;
      color: white;
      border-radius: 4px;
      font-weight: 600;
      font-size: 2rem;
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover {
        background: #ff8533;
      }
    }
  }
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

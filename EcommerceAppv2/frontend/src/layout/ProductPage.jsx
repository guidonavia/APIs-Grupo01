import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductGrid from "../components/ProductGrid";

const ProductPage = () => {
  const { id } = useParams();
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
          <h1>{product.nombre}</h1>
          <p>{product.descripcion}</p>

          <div className="price-section">
            <span className="price">${product.precio}</span>
            <span className="discount">{product.descuento}%</span>
            <span className="original-price">${product.precioOriginal}</span>
          </div>

          <div className="quantity-cart">
            <div className="quantity">
              <button onClick={() => setQty(Math.max(qty - 1, 0))}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button className="add-cart">Añadir al carrito</button>
          </div>
        </InfoCard>
      </MainSection>

      <BottomSection>
        <Related>
          <h3>Productos relacionados</h3>
          <ProductGrid products={relatedProducts} />
        </Related>

        <Payments>
          <h3>Métodos de pago aceptados</h3>
          <ul>
            <li>Visa</li>
            <li>MasterCard</li>
            <li>PayPal</li>
          </ul>
        </Payments>
      </BottomSection>
    </Wrapper>
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
  justify-content: flex-start;

  h1 {
    color: hsl(26, 100%, 55%);
    text-transform: uppercase;
    font-weight: 700;
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    color: hsl(219, 9%, 45%);
    line-height: 1.5;
    margin-bottom: 0.5rem 0;
    font-size: 2.5rem;
  }

  .price-section {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .price {
    font-size: 2.5rem;
    font-weight: 700;
  }

  .discount {
    background: hsl(25, 100%, 94%);
    color: hsl(26, 100%, 55%);
    font-weight: 700;
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
  }

  .original-price {
    color: hsl(220, 14%, 75%);
    text-decoration: line-through;
  }

  .quantity-cart {
    display: flex;
    gap: 1rem;
    align-items: botom;
    margin-top: 1.5rem;
  }

  .quantity {
    display: flex;
    align-items: center;
    background: hsl(220, 14%, 95%);
    border-radius: 8px;

    button {
      border: none;
      background: none;
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      font-weight: 700;
      cursor: pointer;
    }

    span {
      padding: 0 1rem;
    }
  }

  button.add-cart {
    flex: 1;
    background: hsl(26, 100%, 55%);
    border: none;
    padding: 0.7rem 1.2rem;
    color: #ffffffff;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 700;
    text-align: center;
  }
`;

const BottomSection = styled.div`
  display: flex;
  gap: 2rem;
`;

const Related = styled.div`
  flex: 3;
`;

const Payments = styled.div`
  flex: 1;
  padding: 1rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

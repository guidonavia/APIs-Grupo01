import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.imagenes[0]);
      });
  }, [id]);

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
          <h2>{product.nombre}</h2>
          <p>Entrega estimada en 3-5 días</p>
          <p>Política de devoluciones: 30 días</p>
          <button>Añadir al carrito</button>
        </InfoCard>
      </MainSection>

      <BottomSection>
        <Related>
          <h3>Productos relacionados</h3>
          {/* reuse ProductGrid but filter by product.categoria */}
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

  h2 {
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1.5rem;
    background: hsl(26, 100%, 55%);
    border: none;
    padding: 0.7rem 1.2rem;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
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

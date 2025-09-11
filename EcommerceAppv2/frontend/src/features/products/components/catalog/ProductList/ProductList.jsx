import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const ProductGrid = () => {
  const[products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <GridWrapper>
      {products.map((product) => (
        <Card key={product.id}>
          <img src={product.imagenes} alt={product.nombre} />
          <h3>{product.nombre}</h3>
          <p>{product.descripcion}</p>
          <Price>
            {product.precio} {product.moneda}
          </Price>
          <Stock estado={product.estado}>
            {product.estado === "disponible" ? "En stock" : "Agotado"}
          </Stock>
          <button onClick={() => navigate(`/product/${product.id}`)}>
            Ver mas
          </button>
        </Card>
      ))}
    </GridWrapper>
  );
};

export default ProductGrid;

/* ===== Styled Components ===== */
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 1rem;
    margin: 0.5rem 0;
  }

  p {
    color: hsl(26, 100%, 55%);
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  button {
    background: hsl(26, 100%, 55%);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: hsl(26, 90%, 45%);
    }
  }
`;

const Price = styled.p`
  font-size: 1.1rem;
  color: hsl(220, 13%, 13%);
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Stock = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props) =>
    props.estado === "disponible" ? "green" : "red"};
  margin-bottom: 0.5rem;
`;



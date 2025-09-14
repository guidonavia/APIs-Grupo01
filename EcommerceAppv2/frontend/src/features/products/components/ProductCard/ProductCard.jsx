import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card>
       <img src={product.imagenes} alt={product.nombre} />
      <h3>{product.nombre}</h3>
      <p>{product.descripcion}</p>
      <Price>{product.precio} {product.moneda}</Price>
      <Stock estado={product.estado}>
        {product.estado === "disponible" ? "En stock" : "Agotado"}
      </Stock>
      <button onClick={() => navigate(`/product/${product.id}`)}>Ver más</button>
    </Card>
  )
}

export default ProductCard

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: center;

  .image img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #ff7a00;
    color: white;
    border: none;
    cursor: pointer;
  }
`

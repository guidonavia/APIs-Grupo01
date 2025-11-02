import styled from "styled-components";
import { useState, useEffect } from "react";
import productService from "../../../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        console.log("Fetched products:", data); // Log para depuración
        setProducts(data || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos: {error}</p>;
  if (!products.length) return <p>No hay productos disponibles.</p>;

  return (
    <CardWrapper>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <ImageWrapper>
            <img
              src={product.fotos?.[0] || "placeholder.jpg"}
              alt={product.nombre}
            />
          </ImageWrapper>
          <h3>{product.nombre}</h3>
          <strong>Descripcion:</strong><p>{product.descripcion}</p>
          <p>
            <strong>Precio:</strong> ${product.precio}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <p>
            <strong>Categoría:</strong> {product.categoriaId}
          </p>
        </ProductCard>
      ))}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;

  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #333;
  }

  p {
    margin: 0.5rem 0;
    color: #555;
  }

  strong {
    color: #000;
  }
`;

const ImageWrapper = styled.div`
  margin-bottom: 1rem;
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
  }
`;

export default ProductList;

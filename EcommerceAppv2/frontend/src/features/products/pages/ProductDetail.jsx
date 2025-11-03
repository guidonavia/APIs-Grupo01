import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { productService } from "../services/productService";
import ProductInfo from "../components/catalog/ProductInfo/ProductInfo";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        console.log("Fetched product:", data); // Log para depuración
        setProduct(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productService.getAllCategories();
        console.log("Fetched categories:", data); // Log para depuración
        setCategories(data);
      } catch (e) {
        console.error("Error fetching categories:", e);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error al cargar producto: {error}</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  const categoria = categories.find((cat) => cat.id === product.categoriaId);

  return (
    <Wrapper>
      <ImageWrapper>
        <img src={product.fotos?.[0] || "placeholder.jpg"} alt={product.nombre} />
      </ImageWrapper>
      <ProductInfo product={product} showCounter={true} />
      <p>
        <strong>Categoría:</strong> {categoria ? categoria.nombre : "Sin categoría"}
      </p>
    </Wrapper>
  );
};

export default ProductDetail;

const ImageWrapper = styled.div`
  margin-bottom: 1rem;
  img {
    width: 100%;
    max-width: 300px; /* Limita el tamaño máximo de la imagen */
    height: auto;
    border-radius: 8px;
    object-fit: cover;
    display: block;
    margin: 0 auto; /* Centra la imagen */
  }

  @media (max-width: 768px) {
    img {
      max-width: 200px; /* Ajusta el tamaño para pantallas pequeñas */
    }
  }
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra el contenido */

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;


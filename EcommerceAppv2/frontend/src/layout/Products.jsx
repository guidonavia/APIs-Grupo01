import styled from "styled-components";
import { useState, useEffect } from "react";
import Product from "./ProductCard";
import { useLocation } from "react-router-dom";

const Main = ({ search, selectedCategory, filters, setResultsCount }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3002/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location]);

  // Filtrar productos según el término de búsqueda y filtros
  console.log("Filtrando con:", search, filters);
  var filteredProducts = products.filter((product) => {
    const term = (search || "").toLowerCase();
    const matchesTerm =
      (product?.productName || "").toLowerCase().includes(term) ||
      (product?.category || "").toLowerCase().includes(term);

    if (!matchesTerm) return false;

    // category
    if (selectedCategory && selectedCategory !== "All") {
      if (product.category !== selectedCategory) return false;
    }

    // price
    if (filters) {
      const price = Number(product.productPrice ?? product.price ?? 0);
      if (typeof filters.priceMin === "number" && price < filters.priceMin)
        return false;
      if (typeof filters.priceMax === "number" && price > filters.priceMax)
        return false;

      // color
      if (filters.color) {
        if (
          !product.color ||
          product.color.toLowerCase() !== filters.color.toLowerCase()
        )
          return false;
      }

      // size
      if (filters.size) {
        if (!product.size || String(product.size) !== String(filters.size))
          return false;
      }

      // gender
      if (filters.gender) {
        if (
          !product.gender ||
          product.gender.toLowerCase() !== filters.gender.toLowerCase()
        )
          return false;
      }
    }

    return true;
  });

  // report results count to parent if requested
  if (typeof setResultsCount === "function") {
    // best-effort update; ignore errors silently
    try {
      setResultsCount(filteredProducts.length);
    } catch {
      /* noop */
    }
  }

  if (loading) {
    return <MainWrapper>Cargando productos...</MainWrapper>;
  }

  if (error) {
    return <MainWrapper>Error al cargar productos: {error}</MainWrapper>;
  }

  return (
    <MainWrapper>
      {filteredProducts.map((product) => (
        <Product key={product.id} productData={product} />
      ))}
    </MainWrapper>
  );
};

// --- ESTILOS MEJORADOS ---
const MainWrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  /* Crea una grilla responsive: se ajusta automáticamente y cada columna tiene un mínimo de 300px */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem; /* Espacio entre las tarjetas */
`;

export default Main;

import styled from "styled-components";
import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useLocation } from "react-router-dom";
import { API_CONFIG } from "../../../../../shared/constants";

const ProductList = ({
  search,
  selectedCategory,
  filters,
  setResultsCount,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_CONFIG.PRODUCTS_API);
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

  var filteredProducts = products.filter((product) => {
    const term = (search || "").toLowerCase();
    const matchesTerm =
      (product?.productName || "").toLowerCase().includes(term) ||
      (product?.category || "").toLowerCase().includes(term);

    if (!matchesTerm) return false;

    if (selectedCategory && selectedCategory !== "All") {
      if (product.category !== selectedCategory) return false;
    }

    if (filters) {
      const price = Number(product.productPrice ?? product.price ?? 0);
      if (typeof filters.priceMin === "number" && price < filters.priceMin)
        return false;
      if (typeof filters.priceMax === "number" && price > filters.priceMax)
        return false;

      if (filters.color) {
        if (
          !product.color ||
          product.color.toLowerCase() !== filters.color.toLowerCase()
        )
          return false;
      }

      if (filters.size) {
        if (!product.size || String(product.size) !== String(filters.size))
          return false;
      }

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

  if (typeof setResultsCount === "function") {
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
      {filteredProducts.map((product, idx) => (
        <ProductCard key={product.id ?? idx} productData={product} />
      ))}
    </MainWrapper>
  );
};

const MainWrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
`;

export default ProductList;

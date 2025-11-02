import styled from "styled-components";
import { useState, useEffect } from "react";
import productService from "../../../services/productService";
import ProductCard from "../ProductCard/ProductCard";

const ProductList = ({ search = "", selectedCategory = "All", filters = {}, setResultsCount }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        // Normalize product shape for shared components
        const normalized = (data || []).map((p) => {
          const images = p.images
            ? p.images
            : p.fotos
            ? p.fotos.map((f) => (typeof f === "string" ? { url: f } : f))
            : [];

          return {
            ...p,
            images,
            productName: p.productName || p.nombre || p.title || "",
            productDescription: p.productDescription || p.descripcion || p.description || "",
            productPrice: p.productPrice ?? p.precio ?? p.price ?? 0,
            categoriaId: p.categoriaId ?? p.categoryId ?? p.category ?? null,
          };
        });

        setProducts(normalized);
      } catch (e) {
        setError(e.message || String(e));
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await productService.getAllCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (e) {
        // fallback: empty
        setCategories([]);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Helper to get category name from id
  const getCategoryName = (id) => {
    const cat = categories.find(
      (c) => c.id === id || c._id === id || c.nombre === id || c.name === id
    );
    return cat ? cat.nombre || cat.name || String(id) : String(id);
  };

  // Apply search / category / price filters
  const DEFAULT_MAX_PRICE = 500000;
  const priceMin = typeof filters?.priceMin === 'number' ? filters.priceMin : 0;
  const priceMax = typeof filters?.priceMax === 'number' ? filters.priceMax : DEFAULT_MAX_PRICE;

  const filteredProducts = products.filter((product) => {
    // search
    const q = (search || "").trim().toLowerCase();
    if (q) {
      const inName = (product.productName || "").toLowerCase().includes(q);
      const inCompany = (product.companyName || "").toLowerCase().includes(q);
      const inDesc = (product.productDescription || "").toLowerCase().includes(q);
      if (!inName && !inCompany && !inDesc) return false;
    }

    // category
    if (selectedCategory && selectedCategory !== "All" && selectedCategory !== "Todas") {
      const prodCat = getCategoryName(product.categoriaId);
      if (!prodCat) return false;
      if (prodCat !== selectedCategory) return false;
    }

    // price range
    const price = Number(product.productPrice) || 0;
    if (price < priceMin || price > priceMax) return false;

    return true;
  });

  // update the parent with results count if provided
  useEffect(() => {
    if (typeof setResultsCount === 'function') setResultsCount(filteredProducts.length);
  }, [filteredProducts.length]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos: {error}</p>;
  if (!products.length) return <p>No hay productos disponibles.</p>;

  if (!filteredProducts.length) return <p>No hay productos que coincidan con los filtros.</p>;

  return (
    <CardWrapper>
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id || product._id}
          productData={{
            ...product,
            categoryName: getCategoryName(product.categoriaId),
          }}
        />
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

export default ProductList;

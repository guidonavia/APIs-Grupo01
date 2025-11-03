import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../../../services/productService";
import { useCart } from "../../../../cart/context/CartContext";
import CartDrawer from "../../../../cart/components/CartDrawer/CartDrawer";
import ProductCard from "../ProductCard/ProductCard";

const ProductList = ({ search = "", selectedCategory = undefined, selectedcategoria = undefined, filters = {}, setResultsCount }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { addToCart, state } = useCart();

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

  // NOTE: categories are fetched in the effect above together with products.

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // Oculta el pop-up después de 2 segundos
  };

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

  const activeCategory = selectedCategory || selectedcategoria || "All";

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
    if (activeCategory && activeCategory !== "All" && activeCategory !== "Todas") {
      const prodCat = getCategoryName(product.categoriaId);
      if (!prodCat) return false;
      if (prodCat !== activeCategory) return false;
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
    <>
      {showPopup && <Popup>Producto agregado al carrito</Popup>}
      <CartDrawer />
      <CardWrapper>
        {filteredProducts.map((product) => {
          const categoria = categories.find((cat) => cat.id === product.categoriaId || cat._id === product.categoriaId);

          // Prefer normalized fields (productName, productDescription, productPrice, images)
          const name = product.productName || product.nombre || product.title || "Sin nombre";
          const description = product.productDescription || product.descripcion || product.description || "";
          const price = product.productPrice ?? product.precio ?? product.price ?? 0;

          // Robust image selection: try normalized images (objects with url), then fotos (strings or objects), then fallback
          const firstImage = (product.images && product.images[0]) || (product.fotos && product.fotos[0]);
          const imgSrc = firstImage
            ? typeof firstImage === "string"
              ? firstImage
              : firstImage.url || firstImage.src || firstImage.path || JSON.stringify(firstImage)
            : "placeholder.jpg";

          const keyId = product.id || product._id || `${name}-${Math.random()}`;

          return (
            <CardContainer key={keyId} onClick={() => navigate(`/productos/${product.id || product._id}`)}>
              <ImageWrapper>
                <img src={imgSrc} alt={name} />
              </ImageWrapper>
              <h3>{name}</h3>
              <strong>Descripcion:</strong>
              <p>{description}</p>
              <p>
                <strong>Precio:</strong> ${price}
              </p>
              <p>
                <strong>Stock:</strong> {product.stock ?? product.cantidad ?? "-"}
              </p>
              <p>
                <strong>Categoría:</strong> {categoria ? categoria.nombre || categoria.name : "Sin categoría"}
              </p>
              <Button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>Agregar</Button>
            </CardContainer>
          );
        })}
      </CardWrapper>
    </>
  );
};

const Popup = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff9500;
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  z-index: 1000;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #ff9500;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b35f00;
  }
`;


const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

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

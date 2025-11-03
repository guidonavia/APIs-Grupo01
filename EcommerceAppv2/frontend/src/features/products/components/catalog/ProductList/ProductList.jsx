import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../../../services/productService";
import { useCart } from "../../../../cart/context/CartContext";
import CartDrawer from "../../../../cart/components/CartDrawer/CartDrawer";

const ProductList = () => {
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productService.getAllCategories();
        console.log("Fetched categories:", data); // Log para depuración
        setCategories(data || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // Oculta el pop-up después de 2 segundos
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos: {error}</p>;
  if (!products.length) return <p>No hay productos disponibles.</p>;

  return (
    <>
      {showPopup && <Popup>Producto agregado al carrito</Popup>}
      <CartDrawer />
      <CardWrapper>
        {products.map((product) => {
          const categoria = categories.find((cat) => cat.id === product.categoriaId);
          return (
            <ProductCard key={product.id} onClick={() => navigate(`/productos/${product.id}`)}>
              <ImageWrapper>
                <img src={product.fotos?.[0] || "placeholder.jpg"} alt={product.nombre} />
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
                <strong>Categoría:</strong> {categoria ? categoria.nombre : "Sin categoría"}
              </p>
              <Button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>Agregar</Button>
            </ProductCard>
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

const ProductCard = styled.div`
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

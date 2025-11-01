import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { API_CONFIG } from "../../../shared/constants";
import ProductForm from "../components/management/ProductForm/ProductForm";
import ProductTable from "../components/management/ProductTable/ProductTable";

const SellPage = () => {
  const [productos, setProductos] = useState([]);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [actualizando, setActualizando] = useState(false);
  const [productoEditandoId, setProductoEditandoId] = useState(null);
  const [usuario, setUsuario] = useState();

  const [producto, setProducto] = useState({
    id: "",
    companyName: "",
    productName: "",
    productDescription: "",
    productPrice: "",
    category: "",
    isOnSale: false,
    salePercent: 0,
    stock: 0,
    images: [],
  });

  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    setUsuario(userFromStorage);
    setProducto((prev) => ({
      ...prev,
      usuarioId: userFromStorage?.id || "",
    }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_CONFIG.PRODUCTS_API);
        const result = await response.json();
        const productosFiltrados = result.filter(
          (prod) => prod.usuarioId === usuario?.id
        );
        setProductos(productosFiltrados);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };
    if (usuario) {
      fetchData();
    }
  }, [usuario]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !usuario ||
      !producto.companyName ||
      !producto.productName ||
      !producto.productDescription ||
      !producto.productPrice ||
      !producto.category ||
      !producto.stock
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    let imagesArr = [];
    if (imagenes.length > 0) {
      imagesArr = imagenes.slice(0, 5).map((img, idx) => ({
        id: idx + 1,
        url: URL.createObjectURL(img),
        thumbnail: URL.createObjectURL(img),
      }));
    } else {
      imagesArr = producto.images || [];
    }

    const productoFinal = {
      ...producto,
      productPrice: Number(producto.productPrice),
      salePercent: Number(producto.salePercent),
      stock: Number(producto.stock),
      images: imagesArr,
      usuarioId: usuario.id,
    };

    if (actualizando) {
      fetch(`${API_CONFIG.PRODUCTS_API}/${producto.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoFinal),
      })
        .then((response) => response.json())
        .then((data) => {
          const productosActualizados = productos.map((prod) =>
            prod.id === data.id ? data : prod
          );
          setProductos(productosActualizados);
          resetForm();
        })
        .catch((error) =>
          console.error("Error al actualizar el producto:", error)
        );
      setActualizando(false);
    } else {
      const productoConId = {
        ...productoFinal,
        id:
          productos.length === 0
            ? "1"
            : (parseInt(productos[productos.length - 1].id) + 1).toString(),
      };

      fetch(API_CONFIG.PRODUCTS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoConId),
      })
        .then((response) => response.json())
        .then((data) => {
          setProductos([...productos, data]);
          resetForm();
        })
        .catch((error) =>
          console.error("Error al agregar el producto:", error)
        );
    }
  };

  const resetForm = () => {
    setProducto({
      id: "",
      companyName: "",
      productName: "",
      productDescription: "",
      productPrice: "",
      category: "",
      isOnSale: false,
      salePercent: 0,
      stock: 0,
      images: [],
    });
    setImagenes([]);
  };

  const handleEliminarClick = (producto) => {
    setProductoAEliminar(producto);
    setMostrarPopup(true);
  };

  const confirmarEliminar = () => {
    fetch(`${API_CONFIG.PRODUCTS_API}/${productoAEliminar.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProductos(productos.filter((p) => p.id !== productoAEliminar.id));
        setProductoAEliminar(null);
        setTimeout(() => {
          setMostrarPopup(false);
        }, 1000);
      })
      .catch((error) => console.error("Error al eliminar el producto:", error));
  };

  const cancelarEliminar = () => {
    setProductoAEliminar(null);
    setMostrarPopup(false);
  };

  const actualizarProd = (producto) => {
    setActualizando(true);
    setProducto(producto);
    setProductoEditandoId(producto.id);
  };

  const cancelarEdicion = () => {
    setActualizando(false);
    resetForm();
    setProductoEditandoId(null);
  };

  return (
    <SellPageWrapper>
      <h1>
        {actualizando ? "Actualizar producto" : "Publicar nuevo producto"}
      </h1>
      <Content>
        <LeftColumn>
          <ProductForm
            producto={producto}
            setProducto={setProducto}
            imagenes={imagenes}
            setImagenes={setImagenes}
            actualizando={actualizando}
            onSubmit={handleSubmit}
            onCancel={cancelarEdicion}
          />
        </LeftColumn>

        <RightColumn>
          <Section>
            <h2>Mis productos publicados</h2>
            <ProductTable
              productos={productos}
              onEdit={actualizarProd}
              onDelete={handleEliminarClick}
              onCancel={cancelarEdicion}
              actualizando={actualizando}
              productoEditandoId={productoEditandoId}
            />
          </Section>
        </RightColumn>
      </Content>

      {mostrarPopup && (
        <PopupOverlay>
          <Popup>
            <p>¿Estás seguro de que deseas eliminar este producto?</p>
            <PopupActions>
              <Button onClick={confirmarEliminar}>Sí</Button>
              <Button onClick={cancelarEliminar}>No</Button>
            </PopupActions>
          </Popup>
        </PopupOverlay>
      )}
    </SellPageWrapper>
  );
};

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const PopupActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const SellPageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Inter", sans-serif;
  color: #222;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #ff6600;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div``;
const RightColumn = styled.div``;

const Section = styled.section`
  background: #fafafa;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #333;
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #ff6600, #ff8533);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.9rem 1.2rem;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;

  &:hover {
    transform: scale(1.02);
    opacity: 0.95;
  }
`;

export default SellPage;

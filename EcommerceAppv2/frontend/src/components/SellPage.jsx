import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CATEGORIAS = [
  "Zapatillas",
  "Ropa deportiva",
  "Accesorios",
  "Calzado casual",
  "Indumentaria",
  "Equipamiento",
  "Otro",
];

const SellPage = () => {
  const [productos, setProductos] = useState([]); // Lista de productos
  const [productoAEliminar, setProductoAEliminar] = useState(null); // Producto seleccionado para eliminar
  const [mostrarPopup, setMostrarPopup] = useState(false); // Controla la visibilidad del pop-up

  const [actualizando, setActualizando] = useState(false); // Estado de actualización
  const [productoEditandoId, setProductoEditandoId] = useState(null); // ID del producto en edición
  const [usuario, setUsuario] = useState();

  const [producto, setProducto] = useState({
    id: "",
    companyName: "",
    productName: "",
    productDescription: "",
    productPrice: "",
    category: "", // Agregado
    isOnSale: false,
    salePercent: 0,
    stock: 0,
    images: [],
  });

  const [imagenes, setImagenes] = useState([]);

  // Cargar productos desde json-server al montar el componente
  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    setUsuario(userFromStorage);
    setProducto((prev) => ({
      ...prev,
      usuarioId: userFromStorage?.id || "",
    }));
  }, []);

  // Cargar productos desde json-server al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/products");
        const result = await response.json();
        // Filtrar productos por usuarioId
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto({
      ...producto,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImagenes(files);
    // No se actualiza producto.images aquí, se hace en handleSubmit
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (
      !usuario ||
      !producto.companyName ||
      !producto.productName ||
      !producto.productDescription ||
      !producto.productPrice ||
      !producto.category || // Agregado
      !producto.stock
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Procesar imágenes (solo URLs locales, en producción deberías subirlas a un servidor)
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
      fetch(`http://localhost:3002/products/${producto.id}`, {
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
          setProducto({
            id: "",
            companyName: "",
            productName: "",
            productDescription: "",
            productPrice: "",
            category: "", // Agregado
            isOnSale: false,
            salePercent: 0,
            stock: 0,
            images: [],
          });
          setImagenes([]);
        })
        .catch((error) =>
          console.error("Error al actualizar el producto:", error)
        );
      setActualizando(false);
    } else {
      // Asignar un ID único (simplemente el siguiente número en la lista)
      const productoConId = {
        ...productoFinal,
        id:
          productos.length === 0
            ? "1"
            : (parseInt(productos[productos.length - 1].id) + 1).toString(),
      };

      fetch("http://localhost:3002/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoConId),
      })
        .then((response) => response.json())
        .then((data) => {
          setProductos([...productos, data]);
          setProducto({
            id: "",
            companyName: "",
            productName: "",
            productDescription: "",
            productPrice: "",
            category: "", // Agregado
            isOnSale: false,
            salePercent: 0,
            stock: 0,
            images: [],
          });
          setImagenes([]);
        })
        .catch((error) =>
          console.error("Error al agregar el producto:", error)
        );
    }
  };

  const handleEliminarClick = (producto) => {
    setProductoAEliminar(producto); // Establece el producto a eliminar
    setMostrarPopup(true); // Muestra el pop-up
  };

  const confirmarEliminar = () => {
    // Eliminar el producto de json-server
    fetch(`http://localhost:3002/products/${productoAEliminar.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProductos(productos.filter((p) => p.id !== productoAEliminar.id)); // Actualiza la lista de productos
        setProductoAEliminar(null); // Limpia el producto seleccionado

        // Oculta el pop-up después de 1 segundo
        setTimeout(() => {
          setMostrarPopup(false);
        }, 1000);
      })
      .catch((error) => console.error("Error al eliminar el producto:", error));
  };

  const cancelarEliminar = () => {
    setProductoAEliminar(null); // Limpia el producto seleccionado
    setMostrarPopup(false); // Oculta el pop-up
  };

  const actualizarProd = (producto) => {
    setActualizando(true);
    setProducto(producto);
    setProductoEditandoId(producto.id); // Guardar el ID del producto en edición
  };

  const cancelarEdicion = () => {
    setActualizando(false);
    setProducto({
      id: "",
      companyName: "",
      productName: "",
      productDescription: "",
      productPrice: "",
      category: "", // Agregado
      isOnSale: false,
      salePercent: 0,
      stock: 0,
      images: [],
    });
    setImagenes([]);
    setProductoEditandoId(null); // Limpiar el ID del producto en edición
  };

  return (
    <SellPageWrapper>
      <h1>
        {actualizando ? "Actualizar producto" : "Publicar nuevo producto"}
      </h1>
      <Content>
        <LeftColumn>
          <Section>
            <h2>
              {actualizando ? "Actualizar producto" : "Publicar nuevo producto"}
            </h2>
            <Form onSubmit={handleSubmit}>
              <Label>
                Nombre de la empresa
                <Input
                  type="text"
                  name="companyName"
                  value={producto.companyName}
                  onChange={handleInputChange}
                  placeholder="Ej: Sneaker Company"
                />
              </Label>
              <Label>
                Nombre del producto
                <Input
                  type="text"
                  name="productName"
                  value={producto.productName}
                  onChange={handleInputChange}
                  placeholder="Ej: Fall Limited Edition"
                />
              </Label>
              <Label>
                Descripción
                <TextArea
                  name="productDescription"
                  value={producto.productDescription}
                  onChange={handleInputChange}
                  rows={3}
                />
              </Label>
              <Label>
                Precio
                <Input
                  type="number"
                  name="productPrice"
                  value={producto.productPrice}
                  onChange={handleInputChange}
                  min="1"
                  placeholder="Precio"
                />
              </Label>
              <Label>
                Categoría
                <Select
                  name="category"
                  value={producto.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {CATEGORIAS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              </Label>
              <Label>
                ¿Está en oferta?
                <Input
                  type="checkbox"
                  name="isOnSale"
                  checked={producto.isOnSale}
                  onChange={handleInputChange}
                />
              </Label>
              {producto.isOnSale && (
                <Label>
                  Porcentaje de oferta (0 a 1)
                  <Input
                    type="number"
                    name="salePercent"
                    value={producto.salePercent}
                    onChange={handleInputChange}
                    min="0"
                    max="1"
                    step="0.01"
                    placeholder="Ej: 0.5 para 50%"
                  />
                </Label>
              )}
              <Label>
                Stock disponible
                <Input
                  type="number"
                  name="stock"
                  value={producto.stock}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="Cantidad"
                />
              </Label>
              <Label>
                Fotos del producto (máx. 5)
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImagenesChange}
                />
              </Label>
              <Button type="submit">
                {actualizando ? "Actualizar producto" : "Publicar producto"}
              </Button>
            </Form>
            <div>
              {imagenes.map((img, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(img)}
                  alt={`preview-${idx}`}
                  width={60}
                />
              ))}
            </div>
          </Section>
        </LeftColumn>

        <RightColumn>
          <Section>
            <h2>Mis productos publicados</h2>
            <ProductList>
              {productos.map((producto) => (
                <ProductItem key={producto.id}>
                  {producto.images && producto.images.length > 0 && (
                    <ProductImage
                      src={
                        producto.images[0].thumbnail || producto.images[0].url
                      }
                      alt={producto.productName}
                    />
                  )}
                  <ProductInfo>
                    <p className="nombre">{producto.productName}</p>
                    <p className="categoria">{producto.companyName}</p>
                    <p className="category">
                      Categoría: {producto.category}
                    </p>{" "}
                    {/* Agregado */}
                    <p className="stock">Stock: {producto.stock}</p>
                    <p className="precio">
                      Precio: $
                      {producto.productPrice -
                        (producto.isOnSale
                          ? producto.productPrice * producto.salePercent
                          : 0)}
                    </p>
                    {producto.isOnSale && (
                      <p className="oferta">
                        Oferta: {producto.salePercent * 100}% OFF
                      </p>
                    )}
                  </ProductInfo>
                  <Actions>
                    {actualizando && producto.id === productoEditandoId ? (
                      <EditButton
                        onClick={cancelarEdicion}
                        style={{ background: "#aaa" }}
                      >
                        Cancelar
                      </EditButton>
                    ) : (
                      <EditButton onClick={() => actualizarProd(producto)}>
                        Editar
                      </EditButton>
                    )}
                    <DeleteButton onClick={() => handleEliminarClick(producto)}>
                      Eliminar
                    </DeleteButton>
                  </Actions>
                </ProductItem>
              ))}
            </ProductList>
          </Section>
        </RightColumn>
      </Content>

      {/* Pop-up de confirmación */}
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

// ===== Estilos =====
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

  > header {
    padding: 1.5rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    margin-left: -1rem;
    margin-right: 0;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #ff6600;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #333;
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: 0.4rem;
  color: #444;
`;

const Input = styled.input`
  padding: 0.7rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #ff6600;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 0.7rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #ff6600;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 0.7rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #ff6600;
    outline: none;
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

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

const ProductImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
`;

const ProductInfo = styled.div`
  flex: 1;

  .nombre {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }

  .categoria {
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 0.3rem;
  }

  .category {
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 0.3rem;
    font-style: italic;
  }

  .stock {
    font-size: 0.9rem;
    color: #444;
  }

  .precio {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    margin: 0.2rem 0;
  }

  .oferta {
    font-size: 0.9rem;
    color: #e74c3c;
    font-weight: 500;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const EditButton = styled.button`
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2980b9;
  }
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #c0392b;
  }
`;

export default SellPage;

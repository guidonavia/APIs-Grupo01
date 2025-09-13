import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SellPage = () => {
  const [productos, setProductos] = useState([]); // Lista de productos
  const [productoAEliminar, setProductoAEliminar] = useState(null); // Producto seleccionado para eliminar
  const [mostrarPopup, setMostrarPopup] = useState(false); // Controla la visibilidad del pop-up

  const [actualizando, setActualizando] = useState(false); // Estado de actualización

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    stock: "",
    imagen: null,
  });

  // Cargar productos desde json-server al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/productos");
        const result = await response.json();
        setProductos(result);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleFileChange = (e) => {
    setProducto({
      ...producto,
      imagen: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!producto.nombre || !producto.categoria || !producto.stock) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (actualizando) {
      console.log("Actualizando producto...");
      console.log(producto);
      fetch(`http://localhost:3002/productos/${producto.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      })
        .then((response) => response.json())
        .then((data) => {
          const productosActualizados = productos.map((prod) =>
            prod.id === data.id ? data : prod
          );
          setProductos(productosActualizados);
          setProducto({
            nombre: "",
            descripcion: "",
            categoria: "",
            stock: "",
            imagen: null,
          }); // Limpia el formulario
        })
        .catch((error) =>
          console.error("Error al agregar el producto:", error)
        );
      setActualizando(false);
    } else {
      // Asignar un ID único (simplemente el siguiente número en la lista)
      const productoConId = {
        ...producto,
        id: (productos.length === 0 ? "1" : (parseInt(productos[productos.length - 1].id) + 1).toString()),
      };

      // Agregar el producto a json-server
      fetch("http://localhost:3002/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoConId),
      })
        .then((response) => response.json())
        .then((data) => {
          setProductos([...productos, data]); // Actualiza la lista de productos
          setProducto({
            nombre: "",
            descripcion: "",
            categoria: "",
            stock: "",
            imagen: null,
          }); // Limpia el formulario
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
    fetch(`http://localhost:3002/productos/${productoAEliminar.id}`, {
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
                Nombre del producto
                <Input
                  type="text"
                  name="nombre"
                  value={producto.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: Zapatillas deportivas"
                />
              </Label>
              <Label>
                Descripción
                <TextArea
                  name="descripcion"
                  value={producto.descripcion}
                  onChange={handleInputChange}
                  rows={3}
                />
              </Label>
              <Label>
                Categoría
                <Select
                  name="categoria"
                  value={producto.categoria}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="calzado">Calzado</option>
                  <option value="ropa">Ropa</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="otros">Otros</option>
                </Select>
              </Label>
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
                Fotos del producto
                <Input
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                />
              </Label>
              <Button type="submit">
                {actualizando ? "Actualizar producto" : "Publicar producto"}
              </Button>
            </Form>
          </Section>
        </LeftColumn>

        <RightColumn>
          <Section>
            <h2>Mis productos publicados</h2>
            <ProductList>
              {productos.map((producto) => (
                <ProductItem key={producto.id}>
                  <ProductImage src={producto.imagen} alt={producto.nombre} />
                  <ProductInfo>
                    <p className="nombre">{producto.nombre}</p>
                    <p className="categoria">{producto.categoria}</p>
                    <p className="stock">Stock: {producto.stock}</p>
                  </ProductInfo>
                  <Actions>
                    <EditButton onClick={() => actualizarProd(producto)}>
                      Editar
                    </EditButton>
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

  .stock {
    font-size: 0.9rem;
    color: #444;
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

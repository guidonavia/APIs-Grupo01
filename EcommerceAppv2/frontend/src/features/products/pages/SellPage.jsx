import React, { useState, useEffect } from "react";
import styled from "styled-components";
import productService from "../../products/services/productService";
//import authService from "../../auth/services/authService";

const SellPage = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    stock: "",
    fotos: [],
    categoriaId: "",
  });
  const [imagenes, setImagenes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [actualizando, setActualizando] = useState(false);
  const [productoIdActual, setProductoIdActual] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productService.getAllCategories();
        setCategorias(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await productService.getAllProducts();
        setProductos(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProductos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
  };

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImagenes(files);
    setProducto({
      ...producto,
      fotos: files.map((file) => URL.createObjectURL(file)),
    });
  };

  const handleUpdateProduct = (productId) => {
    // Buscar el producto en el estado `productos`
    const productData = productos.find((producto) => producto.id === productId);

    if (!productData) {
      console.error("Producto no encontrado con el ID:", productId);
      alert("El producto seleccionado no existe.");
      return;
    }

    // Obtener el ID del usuario desde el servicio de autenticación
    //const userId = authService.getUserId();
    const userId = 4;

    // Activar modo de edición
    setActualizando(true);
    setProductoIdActual(productId);

    // Cargar los datos en el formulario, incluyendo el creador
    setProducto({
      nombre: productData.nombre,
      precio: productData.precio,
      descripcion: productData.descripcion,
      stock: productData.stock,
      fotos: productData.fotos,
      categoriaId: productData.categoria?.id || "", // Manejar caso de categoría inexistente
     
    });

    alert("Producto cargado en el formulario para actualizar");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!producto.categoriaId) {
        alert("Por favor selecciona una categoría válida.");
        return;
      }

      const formattedProducto = {
        nombre: producto.nombre,
        precio: parseFloat(producto.precio),
        descripcion: producto.descripcion,
        stock: parseInt(producto.stock, 10),
        fotos: producto.fotos,
        categoriaId: parseInt(producto.categoriaId, 10),
      };

      
      if (actualizando) {
        // Actualizar producto existente
        console.log("Actualizando producto con datos:", formattedProducto);
        console.log("ID del producto a actualizar:", productoIdActual);
        await productService.updateProduct(productoIdActual, formattedProducto);
        alert("Producto actualizado exitosamente");
      } else {
        const formattedProducto = {
          nombre: producto.nombre,
          precio: parseFloat(producto.precio),
          descripcion: producto.descripcion,
          stock: parseInt(producto.stock, 10),
          fotos: producto.fotos,
          categoria: { id: parseInt(producto.categoriaId, 10) },
        };
        await productService.createProduct(formattedProducto);
        alert("Producto creado exitosamente");
      }

      // Resetear formulario y estado
      setProducto({
        nombre: "",
        precio: "",
        descripcion: "",
        stock: "",
        fotos: [],
        categoriaId: "",
      });
      setActualizando(false);
      setProductoIdActual(null);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      alert('Producto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <FormWrapper>
      <h2>Crear nuevo producto</h2>
      <Form onSubmit={handleSubmit}>
        <Label>
          Nombre del producto
          <Input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleInputChange}
            placeholder="Ej: Fall Limited Edition"
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
          Precio
          <Input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleInputChange}
            min="1"
            placeholder="Precio"
          />
        </Label>
        <Label>
          Categoría
          <Select
            name="categoriaId"
            value={producto.categoriaId}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
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
          Fotos del producto (máx. 5)
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagenesChange}
          />
        </Label>
        <Button type="submit">{actualizando ? "Actualizar producto" : "Crear producto"}</Button>
      </Form>

      <h2>Productos creados</h2>
      <ProductList>
        {productos.map((producto) => (
          
          <ProductCard key={producto.id}>

            <img src={producto.fotos[0]} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <p>Stock: {producto.stock}</p>
            <ButtonGroup>
              <Button onClick={() => handleUpdateProduct(producto.id)}>Actualizar Producto</Button>
              <Button onClick={() => handleDeleteProduct(producto.id)}>Eliminar Producto</Button>
          </ButtonGroup>
          </ProductCard>
        ))}
      </ProductList>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const ProductCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1rem;
    color: #555;
  }
`;

export default SellPage;
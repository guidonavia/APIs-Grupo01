import React, { useState, useEffect } from "react";
import styled from "styled-components";
import productService from "../../products/services/productService";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!producto.categoriaId) {
        alert("Por favor selecciona una categoría válida.");
        return;
      }

      // Transformar las fotos a URLs absolutas (simulación de subida)
      const uploadedFotos = producto.fotos.map((foto, index) => {
        return `https://example.com/uploads/producto-${Date.now()}-${index}.jpg`;
      });

      const formattedProducto = {
        nombre: producto.nombre,
        precio: parseFloat(producto.precio), // Asegurar que sea decimal
        descripcion: producto.descripcion,
        stock: parseInt(producto.stock, 10),
        fotos: producto.fotos, // Usar URLs absolutas
        categoria: {
          id: parseInt(producto.categoriaId, 10),
        }
      };

      await productService.createProduct(formattedProducto);
      alert("Producto creado exitosamente");
    } catch (error) {
      console.error("Error creando el producto:", error);
    }
  }

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
        <Button type="submit">Crear producto</Button>
      </Form>
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

export default SellPage;
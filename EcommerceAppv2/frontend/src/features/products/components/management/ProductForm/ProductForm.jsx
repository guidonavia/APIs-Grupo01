import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CATEGORIAS = [
  1,
  2,
  3,
  4,
  5
];

const ProductForm = ({ 
  producto, 
  setProducto, 
  imagenes, 
  setImagenes, 
  actualizando, 
  onSubmit,
  onCancel 
}) => {
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
  };

  return (
    <FormWrapper>
      <h2>
        {actualizando ? "Actualizar producto" : "Publicar nuevo producto"}
      </h2>
      <Form onSubmit={onSubmit}>
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
            name="categoria"
            value={producto.categoria}
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
        <ButtonGroup>
          <Button type="submit">
            {actualizando ? "Actualizar producto" : "Publicar producto"}
          </Button>
          {actualizando && onCancel && (
            <CancelButton type="button" onClick={onCancel}>
              Cancelar
            </CancelButton>
          )}
        </ButtonGroup>
      </Form>
      {imagenes.length > 0 && (
        <ImagePreview>
          {imagenes.map((img, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt={`preview-${idx}`}
              width={60}
            />
          ))}
        </ImagePreview>
      )}
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
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
  flex: 1;

  &:hover {
    transform: scale(1.02);
    opacity: 0.95;
  }
`;

const CancelButton = styled.button`
  background: #aaa;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.9rem 1.2rem;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #888;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

export default ProductForm;


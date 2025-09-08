import React from "react";
import styled from "styled-components";

const SellPage = () => {
  return (
    <SellPageWrapper>
      <h1>Vender</h1>
      <Section>
        <h2>Publicar nuevo producto</h2>
        <Form>
          <Label>
            Nombre del producto
            <Input type="text" placeholder="Ej: Zapatillas deportivas" />
          </Label>
          <Label>
            Descripción
            <TextArea placeholder="Describe el producto..." rows={3} />
          </Label>
          <Label>
            Categoría
            <Select>
              <option value="">Selecciona una categoría</option>
              <option value="calzado">Calzado</option>
              <option value="ropa">Ropa</option>
              <option value="accesorios">Accesorios</option>
              <option value="otros">Otros</option>
            </Select>
          </Label>
          <Label>
            Stock disponible
            <Input type="number" min="0" placeholder="Cantidad" />
          </Label>
          <Label>
            Fotos del producto
            <Input type="file" multiple accept="image/*" />
          </Label>
          <Button type="button">Publicar producto</Button>
        </Form>
      </Section>
      <Section>
        <h2>Mis productos publicados</h2>
        <ProductList>
          <ProductItem>
            <ProductImage
              src="/src/assets/image-product-1-thumbnail.jpg"
              alt="Producto"
            />
            <ProductDetails>
              <strong>Nombre del producto</strong>
              <span>Categoría: Calzado</span>
              <span>Stock: 10</span>
            </ProductDetails>
            <DeleteButton>Eliminar</DeleteButton>
          </ProductItem>
          {/* Más productos aquí... */}
        </ProductList>
      </Section>
    </SellPageWrapper>
  );
};

const SellPageWrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  h1 {
    font-size: 2.5rem;
    color: hsl(var(--black));
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.6rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.6rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.6rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const Button = styled.button`
  background: hsl(var(--orange, 26, 100%, 55%));
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
  &:hover {
    background: hsl(var(--orange), 26, 100%, 45%);
  }
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const ProductDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #c0392b;
  }
`;

export default SellPage;

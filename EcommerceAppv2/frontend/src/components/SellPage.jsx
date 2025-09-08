import React from "react";
import styled from "styled-components";

 const productosEjemplo = [
      {
        id: 1,
        nombre: "Zapatillas deportivas",
        categoria: "Calzado",
        stock: 10,
        imagen: "/src/assets/image-product-1-thumbnail.jpg"
      },
      {
        id: 2,
        nombre: "Remera básica",
        categoria: "Ropa",
        stock: 25,
        imagen: "/src/assets/image-product-2-thumbnail.jpg"
      },
      {
        id: 3,
        nombre: "Gorra urbana",
        categoria: "Accesorios",
        stock: 7,
        imagen: "/src/assets/image-product-3-thumbnail.jpg"
      }
    ];

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
              {productosEjemplo.map(producto => (
                <ProductItem key={producto.id}>
                  <ProductImage
                    src={producto.imagen}
                    alt={producto.nombre}
                  />
                  <ProductDetails>
                    <EditableInput type="text" value={producto.nombre} readOnly />
                    <EditableInput type="text" value={producto.categoria} readOnly />
                    <EditableInput type="number" value={producto.stock} readOnly />
                  </ProductDetails>
                  <EditButton>Editar</EditButton>
                  <DeleteButton>Eliminar</DeleteButton>
                </ProductItem>
              ))}
            </ProductList>
          </Section>
        </SellPageWrapper>
      );
  };

  const SellPageWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const EditableInput = styled.input`
  padding: 0.4rem 0.8rem;     
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
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

const EditButton = styled.button`
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #2980b9;
  }
`;

export default SellPage;

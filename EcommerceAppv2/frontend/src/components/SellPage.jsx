import React from "react";
import styled from "styled-components";

const productosEjemplo = [
  {
    id: 1,
    nombre: "Zapatillas deportivas",
    categoria: "Calzado",
    stock: 10,
    imagen: "/src/assets/image-product-1-thumbnail.jpg",
  },
  {
    id: 2,
    nombre: "Remera básica",
    categoria: "Ropa",
    stock: 25,
    imagen: "/src/assets/image-product-2-thumbnail.jpg",
  },
  {
    id: 3,
    nombre: "Gorra urbana",
    categoria: "Accesorios",
    stock: 7,
    imagen: "/src/assets/image-product-3-thumbnail.jpg",
  },
];

const SellPage = () => {
  return (
    <SellPageWrapper>
      <h1>Vender productos</h1>
      <Content>
        <LeftColumn>
          <Section>
            <h2>Publicar nuevo producto</h2>
            <Form>
              <Label>
                Nombre del producto
                <Input type="text" placeholder="Ej: Zapatillas deportivas" />
              </Label>
              <Label>
                Descripción
                <TextArea  rows={3} />
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
        </LeftColumn>

        <RightColumn>
          <Section>
            <h2>Mis productos publicados</h2>
            <ProductList>
              {productosEjemplo.map((producto) => (
                <ProductItem key={producto.id}>
                  <ProductImage src={producto.imagen} alt={producto.nombre} />
                  <ProductInfo>
                    <p className="nombre">{producto.nombre}</p>
                    <p className="categoria">{producto.categoria}</p>
                    <p className="stock">Stock: {producto.stock}</p>
                  </ProductInfo>
                  <Actions>
                    <EditButton>Editar</EditButton>
                    <DeleteButton>Eliminar</DeleteButton>
                  </Actions>
                </ProductItem>
              ))}
            </ProductList>
          </Section>
        </RightColumn>
      </Content>
    </SellPageWrapper>
  );
};

// ===== Estilos =====

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

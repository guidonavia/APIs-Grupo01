import styled from "styled-components";

const ProductTable = ({ 
  productos, 
  onEdit, 
  onDelete,
  onCancel,
  actualizando, 
  productoEditandoId 
}) => {
  return (
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
            </p>
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
                onClick={onCancel}
                style={{ background: "#aaa" }}
              >
                Cancelar
              </EditButton>
            ) : (
              <EditButton onClick={() => onEdit(producto)}>
                Editar
              </EditButton>
            )}
            <DeleteButton onClick={() => onDelete(producto)}>
              Eliminar
            </DeleteButton>
          </Actions>
        </ProductItem>
      ))}
    </ProductList>
  );
};

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

export default ProductTable;


// 🆕 NUEVO ARCHIVO: tarjeta simple y reusable
import styled from "styled-components"

const ProductCard = ({ product, onClick }) => {
  const img = product.images?.[0]
  const src = img?.url || img // 🧩 NOTA: soporta {url,alt} o string
  const alt = img?.alt || product.productName

  return (
    <Card onClick={onClick} aria-label={`Ver ${product.productName}`}>
      <img src={src} alt={alt} />
      <h3>{product.productName}</h3>
    </Card>
  )
}

const Card = styled.button`
  display: grid;
  gap: .6rem;
  text-align: left;
  background: #fff;
  border: 1px solid hsl(var(--divider));
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;

  img{
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: .8rem;
    display: block;
  }

  h3{
    font-size: 1.4rem;
  }
`

export default ProductCard

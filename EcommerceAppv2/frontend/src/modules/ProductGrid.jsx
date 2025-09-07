
import styled from "styled-components"
import ProductCard from "./ProductCard"

const ProductGrid = ({ products, onSelect }) => {
  return (
    <Grid>
      {products.map(p => (
        <ProductCard key={p.productId} product={p} onClick={() => onSelect(p)} />
      ))}
    </Grid>
  )
}

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1.6rem;
`

export default ProductGrid

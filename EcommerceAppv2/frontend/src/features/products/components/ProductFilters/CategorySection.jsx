// 🆕 NUEVO ARCHIVO: sección de categorías reusable
import styled from "styled-components"

const CategorySection = ({ categories = [] }) => {
  return (
    <Wrap>
      <h2>Categorías</h2>
      <Chips>
        {categories.map(cat => <Chip key={cat}>{cat}</Chip>)}
      </Chips>
    </Wrap>
  )
}

const Wrap = styled.section`
  display: grid;
  gap: .8rem;

  h2{
    font-size: 1.6rem;
  }
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .6rem;
`

const Chip = styled.span`
  font-size: 1.2rem;
  border: 1px solid hsl(var(--divider));
  border-radius: 999px;
  padding: .4rem .8rem;
`

export default CategorySection

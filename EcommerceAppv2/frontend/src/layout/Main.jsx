import styled from "styled-components"
import { useState, useEffect } from "react"
import Product from "./Product"

const Main = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setProducts(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <MainWrapper>Cargando productos...</MainWrapper>
  }

  if (error) {
    return <MainWrapper>Error al cargar productos: {error}</MainWrapper>
  }

  return (
    <MainWrapper>
      {products.map((product) => (
        <Product key={product.id} productData={product} />
      ))}
    </MainWrapper>
  )
}

// --- ESTILOS MEJORADOS ---
const MainWrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  /* Crea una grilla responsive: se ajusta automáticamente y cada columna tiene un mínimo de 300px */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem; /* Espacio entre las tarjetas */
`

export default Main
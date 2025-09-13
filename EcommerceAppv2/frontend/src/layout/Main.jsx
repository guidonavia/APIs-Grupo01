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
  }, []) // El array vacío asegura que esto se ejecute solo una vez

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

const MainWrapper = styled.main`
  max-width: 111rem;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap; // Permite que los productos se acomoden en varias líneas
  justify-content: center; // Centra los productos
  gap: 2rem; // Espacio entre productos
`

export default Main
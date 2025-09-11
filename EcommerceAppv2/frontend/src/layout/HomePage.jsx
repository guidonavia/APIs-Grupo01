import { useState } from "react"
import styled from "styled-components"
import Carousel from "../shared/components/ui/Carousel"
import ProductGrid from "../features/products/components/catalog/ProductList/ProductList"
import Footer from "../shared/components/layout/Footer/Footer"


const HomePage = () => {
  const [user, setUser] = useState(null)

  const handleSignIn = () => {
    // Mock login
    setUser({ name: "John Doe" })
  }

  return (
    <PageWrapper>
      <Carousel />
      <ProductGrid />
      <Footer />
    </PageWrapper>
  )
}

export default HomePage

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const SectionTitle = styled.h2`
  margin: 2rem 0 1rem;
  padding-left: 2rem;
`


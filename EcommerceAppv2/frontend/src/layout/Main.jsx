import React, { useMemo, useState } from 'react'                 
import styled from "styled-components"
import Product from "./Product"                                  
import { products as allProducts } from "../utils/data"         
import ProductGrid from "../modules/ProductGrid"                 
import CategorySection from "../modules/CategorySection"          

const Main = () => {
  
  const [selectedProduct, setSelectedProduct] = useState(null)

 
  const sortedProducts = useMemo(() => {
    return [...allProducts].sort((a, b) =>
      (a.productName || "").toLowerCase().localeCompare((b.productName || "").toLowerCase())
    )
  }, [])

  
  const categories = useMemo(() => {
    const set = new Set(sortedProducts.map(p => p.category).filter(Boolean))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [sortedProducts])

  
  if (selectedProduct) {
    return (
      <MainWrapper>
        <BackBtn onClick={() => setSelectedProduct(null)}>← Volver</BackBtn> 
        <Product product={selectedProduct} />                                
      </MainWrapper>
    )
  }

 
  return (
    <MainWrapper>
      <ProductGrid products={sortedProducts} onSelect={setSelectedProduct} /> 
      <CategorySection categories={categories} />                              
    </MainWrapper>
  )
}

const MainWrapper = styled.main`
  max-width: 111rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;  /* 🔧 CAMBIO */
  gap: 2.4rem;             /* 🔧 CAMBIO */
  justify-content: center;
`

const BackBtn = styled.button`
  align-self: flex-start;
  font-size: 1.4rem;
  padding: .2rem .4rem;
  &:hover{ text-decoration: underline; }
`

export default Main

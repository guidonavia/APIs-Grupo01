import React from "react"
import styled from "styled-components"

const SellPage = () => {
  return (
    <SellPageWrapper>
      <h1>¡Publica tu producto para vender!</h1>
      <p>Completa los detalles del producto que deseas poner a la venta.</p>
    </SellPageWrapper>
  )
}

const SellPageWrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    color: hsl(var(--black));
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: hsl(var(--dark-grayish-blue));
  }
`

export default SellPage
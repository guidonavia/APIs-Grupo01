import { useState } from "react"
import styled from "styled-components"
import Carousel from "../assets/Carousel"
import Main from "./Main"
import Footer from "./Footer"
import Navbar from "./Navigator"


const HomePage = () => {
    const [search, setSearch] = useState("")

  return (
    <PageWrapper>
       <Navbar search={search} setSearch={setSearch} />
       <Carousel />
       <Main search={search} />
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
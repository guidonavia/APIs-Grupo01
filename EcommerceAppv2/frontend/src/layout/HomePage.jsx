import { useState } from "react"
import styled from "styled-components"
import Carousel from "../assets/Carousel"
import Main from "./Main"
import Footer from "./Footer"
import Navbar from "./Navigator"


const HomePage = () => {
    const [search, setSearch] = useState("")
    const [selectedCategory, setCategory] = useState("All");

  return (
    <PageWrapper>
       <Navbar search={search} setSearch={setSearch} selectedCategory={selectedCategory} setCategory={setCategory} />
       <Carousel />
       <Main search={search} selectedCategory={selectedCategory} />
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
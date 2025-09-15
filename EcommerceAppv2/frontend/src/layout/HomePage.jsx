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

  .carousel {
    width: 100%;
    height: 400px; /* ajusta según diseño */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
`;


import React from "react";
import styled from "styled-components";
import Carousel from "../assets/Carousel";
import Main from "./Products";

const HomePage = ({ search, selectedCategory, filters, setResultsCount }) => {
  return (
    <PageWrapper>
      <Carousel />
      <Main
        search={search}
        selectedCategory={selectedCategory}
        filters={filters}
        setResultsCount={setResultsCount}
      />
    </PageWrapper>
  );
};

export default HomePage;

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

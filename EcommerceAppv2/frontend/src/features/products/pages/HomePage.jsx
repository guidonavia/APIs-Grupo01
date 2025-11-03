import React from "react";
import styled from "styled-components";
import Carousel from "../../../assets/Carousel";
import ProductList from "../components/catalog/ProductList/ProductList";

const HomePage = ({ search, selectedcategoria, filters, setResultsCount }) => {
  return (
    <PageWrapper>
      <Carousel />
      <ProductList
        search={search}
        selectedcategoria={selectedcategoria}
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
    height: 400px;
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


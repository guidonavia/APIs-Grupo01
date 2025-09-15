import React from "react";
import styled from "styled-components";

const Categories = ({ categories, selectedCategory, setCategory }) => {
  return (
    <BarWrapper>
      {categories.map((cat, idx) => (
        <CategoryButton
          key={idx}
          $active={selectedCategory === cat}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </CategoryButton>
      ))}
    </BarWrapper>
  );
};

export default Categories;


const BarWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1rem 0;
`;

const CategoryButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background-color: ${({ $active }) => ($active ? "#333" : "#eee")};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

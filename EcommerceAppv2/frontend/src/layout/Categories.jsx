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
  gap: 0.75rem;
  justify-content: center;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  padding: 0.55rem 1.1rem;
  border: none;
  border-radius: 999px;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(90deg,#ff7a18,#ff3d00)"
      : "linear-gradient(90deg,#ffffff, #f1f1f1)"};
  color: ${({ $active }) => ($active ? "#fff" : "#222")};
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease, opacity 150ms ease;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  box-shadow: ${({ $active }) =>
    $active ? "0 6px 18px rgba(255,61,0,0.28)" : "0 3px 8px rgba(0,0,0,0.06)"};
  border: ${({ $active }) =>
    $active
      ? "2px solid rgba(255,255,255,0.15)"
      : "1px solid rgba(0,0,0,0.05)"};

  &:hover {
    transform: translateY(-3px) scale(1.02);
    opacity: 0.95;
  }
`;

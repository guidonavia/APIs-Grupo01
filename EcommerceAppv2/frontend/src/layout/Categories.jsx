import React from "react";
import styled from "styled-components";

const Categories = ({
  categories,
  selectedCategory,
  setCategory,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  color,
  setColor,
  size,
  setSize,
  gender,
  setGender,
}) => {
  return (
    <BarWrapper>
      <FiltersRow>
        <CategoryGroup>
          {categories.map((cat, idx) => (
            <CategoryButton
              key={idx}
              $active={selectedCategory === cat}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </CategoryButton>
          ))}
        </CategoryGroup>

        <ControlsGroup>
          <PriceInputs>
            <input
              type="number"
              aria-label="precio-min"
              value={priceMin}
              onChange={(e) => setPriceMin(Number(e.target.value))}
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              aria-label="precio-max"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              placeholder="Max"
            />
          </PriceInputs>

          <Select onChange={(e) => setColor(e.target.value)} value={color}>
            <option value="">Color</option>
            <option value="black">Negro</option>
            <option value="white">Blanco</option>
            <option value="red">Rojo</option>
            <option value="blue">Azul</option>
          </Select>

          <Select onChange={(e) => setSize(e.target.value)} value={size}>
            <option value="">Talle</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
          </Select>

          <GenderGroup>
            <GenderButton $active={gender === ""} onClick={() => setGender("")}>
              All
            </GenderButton>
            <GenderButton
              $active={gender === "female"}
              onClick={() => setGender("female")}
            >
              F
            </GenderButton>
            <GenderButton
              $active={gender === "male"}
              onClick={() => setGender("male")}
            >
              M
            </GenderButton>
          </GenderGroup>
        </ControlsGroup>
      </FiltersRow>
    </BarWrapper>
  );
};

export default Categories;

const BarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.6rem 0 1.2rem 0;
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0.6rem;
  }
`;

const CategoryGroup = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  flex-wrap: wrap;
`;

const ControlsGroup = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;

  @media (max-width: 900px) {
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
  }
`;

const CategoryButton = styled.button`
  padding: 0.45rem 0.95rem;
  border: none;
  border-radius: 999px;
  background: ${({ $active }) =>
    $active ? "linear-gradient(90deg,#ff7a18,#ff3d00)" : "#fff"};
  color: ${({ $active }) => ($active ? "#fff" : "#222")};
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease, opacity 120ms ease;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  box-shadow: ${({ $active }) =>
    $active ? "0 8px 22px rgba(255,61,0,0.22)" : "0 3px 8px rgba(0,0,0,0.06)"};
  border: 1px solid rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-2px);
  }
`;

const PriceInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    width: 80px;
    padding: 0.4rem 0.6rem;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    font-weight: 600;
  }

  span {
    color: #666;
  }
`;

const Select = styled.select`
  padding: 0.45rem 0.6rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  font-weight: 600;
`;

const GenderGroup = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

const GenderButton = styled.button`
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  border: none;
  background: ${({ $active }) => ($active ? "#ff6b00" : "rgba(0,0,0,0.05)")};
  color: ${({ $active }) => ($active ? "#fff" : "#222")};
  font-weight: 700;
  cursor: pointer;
`;

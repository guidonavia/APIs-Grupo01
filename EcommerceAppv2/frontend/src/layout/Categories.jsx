import React from "react";
import styled from "styled-components";
import { Range } from "react-range";

const Categories = ({
  categories = [],
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
  const resetFilters = () => {
    setCategory("All");
    setPriceMin(0);
    setPriceMax(1000);
    setColor("");
    setSize("");
    setGender("");
  };

  return (
    <Container>
      <Section>
        <Label>Categorías</Label>
        <CategoryGroup>
          {categories.map((cat) => (
            <CategoryButton
              key={cat}
              $active={selectedCategory === cat}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </CategoryButton>
          ))}
        </CategoryGroup>
      </Section>

      <Divider />

      <Section>
        <Label>Precio</Label>
        <PriceFilter>
          <Range
            step={10}
            min={0}
            max={2000}
            values={[priceMin, priceMax]}
            onChange={([min, max]) => {
              setPriceMin(min);
              setPriceMax(max);
            }}
            renderTrack={({ props, children }) => (
              <Track {...props}>
                <TrackFill left={priceMin / 20} right={priceMax / 20} />
                {children}
              </Track>
            )}
            renderThumb={({ props }) => <Thumb {...props} />}
          />
          <PriceLabel>
            ${priceMin} - ${priceMax}
          </PriceLabel>
        </PriceFilter>
      </Section>

      <Divider />

      <Section>
        <Label>Color</Label>
        <Select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="">Todos</option>
          <option value="black">Negro</option>
          <option value="white">Blanco</option>
          <option value="red">Rojo</option>
          <option value="blue">Azul</option>
        </Select>
      </Section>

      <Section>
        <Label>Talle</Label>
        <Select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="">Todos</option>
          {[36, 37, 38, 39, 40, 41].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Select>
      </Section>

      <Section>
        <Label>Género</Label>
        <GenderGroup>
          {[
            { label: "Todos", value: "" },
            { label: "Mujer", value: "female" },
            { label: "Hombre", value: "male" },
          ].map((g) => (
            <GenderButton
              key={g.value}
              $active={gender === g.value}
              onClick={() => setGender(g.value)}
            >
              {g.label}
            </GenderButton>
          ))}
        </GenderGroup>
      </Section>

      <Divider />

      <ClearButton onClick={resetFilters}>Limpiar filtros</ClearButton>
    </Container>
  );
};

export default Categories;

//
// 💅 ESTILOS
//

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.5rem;
  background: #fff;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 160px;
`;

const Label = styled.h4`
  font-size: 0.95rem;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const Divider = styled.div`
  width: 1px;
  height: 80px;
  background: rgba(0, 0, 0, 0.08);

  @media (max-width: 900px) {
    width: 100%;
    height: 1px;
  }
`;

const CategoryGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const CategoryButton = styled.button`
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  border: ${({ $active }) => ($active ? "none" : "1px solid #ddd")};
  background: ${({ $active }) =>
    $active ? "linear-gradient(90deg,#ff7a18,#ff4a00)" : "#fafafa"};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${({ $active }) =>
      $active ? "linear-gradient(90deg,#ff6a00,#ff3a00)" : "#f0f0f0"};
  }
`;

const PriceFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Track = styled.div`
  height: 8px;
  width: 200px;
  background: #eee;
  border-radius: 999px;
  position: relative;
`;

const TrackFill = styled.div`
  position: absolute;
  height: 8px;
  left: ${({ left }) => left}%;
  right: ${({ right }) => 100 - right}%;
  background: linear-gradient(90deg, #ff7a18, #ff4a00);
  border-radius: 999px;
`;

const Thumb = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #ff7a18;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
`;

const PriceLabel = styled.span`
  font-weight: 600;
  color: #444;
  font-size: 0.9rem;
`;

const Select = styled.select`
  padding: 0.45rem 0.6rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-weight: 600;
  background: #fff;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    border-color: #ff7a18;
  }
`;

const GenderGroup = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const GenderButton = styled.button`
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: ${({ $active }) => ($active ? "none" : "1px solid #ddd")};
  background: ${({ $active }) =>
    $active ? "linear-gradient(90deg,#ff7a18,#ff4a00)" : "#fafafa"};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${({ $active }) =>
      $active ? "linear-gradient(90deg,#ff6a00,#ff3a00)" : "#f0f0f0"};
  }
`;

const ClearButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  background: #fff3ec;
  border: 1px solid #ff7a18;
  font-weight: 700;
  color: #ff4a00;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(90deg,#ff7a18,#ff4a00);
    color: #fff;
  }
`;

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Range } from "react-range";

const ProductFilters = ({
  categories = [],
  selectedcategoria,
  setcategoria,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
}) => {
  const MAX_PRICE = 500000;

  const resetFilters = () => {
    setcategoria("All");
    setPriceMin(0);
    setPriceMax(MAX_PRICE);
  };

  const min = typeof priceMin === "number" && !isNaN(priceMin) ? priceMin : 0;
  const max =
    typeof priceMax === "number" && !isNaN(priceMax) ? priceMax : MAX_PRICE;
  const values = [Math.min(min, max), Math.max(min, max)];

  const currentMin =
    typeof priceMin === "number" && !isNaN(priceMin) ? priceMin : 0;
  const currentMax =
    typeof priceMax === "number" && !isNaN(priceMax) ? priceMax : MAX_PRICE;
  const currentcategoria = selectedcategoria || "All";
  const filtersChanged =
    currentcategoria !== "All" || currentMin !== 0 || currentMax !== MAX_PRICE;

  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const cats =
    categories && categories.length
      ? categories
      : [
          "All",
          "Zapatillas",
          "Ropa deportiva",
          "Accesorios",
          "Calzado casual",
          "Indumentaria",
          "Equipamiento",
        ];

  return (
    <Container>
      <Section>
        <Label>Categoría</Label>
        <CategoriesWrapper ref={panelRef}>
          <CategoriaButton
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-haspopup="menu"
          >
            <span>
              {selectedcategoria === "All"
                ? "Todas"
                : selectedcategoria || "Categorías"}
            </span>
            <Chevron>{open ? "▴" : "▾"}</Chevron>
          </CategoriaButton>

          <DropdownPanel $open={open} role="menu">
            <CategoriaList>
              {cats.map((cat, i) => (
                <CategoriaItem
                  key={cat + i}
                  onClick={() => {
                    setcategoria(cat);
                    setOpen(false);
                  }}
                  $active={selectedcategoria === cat}
                >
                  {cat === "All" ? "Todas" : cat}
                </CategoriaItem>
              ))}
            </CategoriaList>
          </DropdownPanel>
          <MobileSelect
            value={selectedcategoria}
            onChange={(e) => setcategoria(e.target.value)}
            aria-label="Seleccionar categoría"
          >
            {cats.map((cat, i) => (
              <option key={cat + i} value={cat}>
                {cat === "All" ? "Todas" : cat}
              </option>
            ))}
          </MobileSelect>
        </CategoriesWrapper>
      </Section>

      <Divider />

      <Section>
        <Label>Precio</Label>
        <PriceFilter>
          <Range
            step={100}
            min={0}
            max={MAX_PRICE}
            values={values}
            onChange={([minVal, maxVal]) => {
              setPriceMin(minVal);
              setPriceMax(maxVal);
            }}
            renderTrack={({ props, children }) => {
              const { key, style, ...rest } = props;
              const leftPct = ((priceMin || 0) / MAX_PRICE) * 100;
              const rightPct = ((priceMax || 0) / MAX_PRICE) * 100;
              return (
                <Track key={key} {...rest} style={style}>
                  <TrackFill $left={leftPct} $right={rightPct} />
                  {children}
                </Track>
              );
            }}
            renderThumb={({ props }) => {
              const { key, style, ...rest } = props;
              return <Thumb key={key} {...rest} style={style} />;
            }}
          />
          <PriceLabel>
            ${priceMin} - ${priceMax}
          </PriceLabel>
        </PriceFilter>
      </Section>

      {filtersChanged && (
        <>
          <Divider />
          <ClearButton onClick={resetFilters}>Limpiar filtros</ClearButton>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
  justify-content: center;
  min-height: 64px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    min-height: unset;
    padding: 0.75rem;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 100px;
  justify-content: center;
`;

const Label = styled.h4`
  font-size: 0.95rem;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background: rgba(0, 0, 0, 0.07);
  margin: 0 0.4rem;

  @media (max-width: 900px) {
    width: 100%;
    height: 1px;
    margin: 0.8rem 0;
  }
`;

const PriceFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 180px;
`;

const Track = styled.div`
  height: 8px;
  width: 260px;
  max-width: calc(100vw - 240px);
  background: #f6f6f6;
  border-radius: 999px;
  position: relative;
`;

const TrackFill = styled.div`
  position: absolute;
  height: 8px;
  left: ${({ $left }) => $left}%;
  right: ${({ $right }) => 100 - $right}%;
  background: linear-gradient(90deg, #ff7a18, #ffd166);
  border-radius: 999px;
`;

const Thumb = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #ff7a18;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
`;

const PriceLabel = styled.span`
  font-weight: 600;
  color: #444;
  font-size: 0.9rem;
`;

const CategoriesWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const CategoriaButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.9rem;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #f2f2f2;
  font-weight: 600;
  font-size: 0.95rem;
  color: #0b1220;
  cursor: pointer;
  min-width: 180px;
  justify-content: space-between;

  &:hover {
    border-color: #ffd166;
    box-shadow: 0 8px 20px rgba(16, 24, 40, 0.04);
  }
`;

const Chevron = styled.span`
  color: #444;
  font-size: 0.95rem;
`;
const DropdownPanel = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  min-width: 260px;
  max-width: 420px;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  color: #0b1220;
  border: 1px solid #eef0f2;
  border-radius: 10px;
  padding: 0.4rem 0.35rem;
  z-index: 1200;
  display: ${({ $open }) => ($open ? "block" : "none")};

  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);
  animation: fadeIn 0.12s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;


const CategoriaList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const CategoriaItem = styled.li`
  padding: 0.58rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  color: ${({ $active }) => ($active ? "#081018" : "#0b1220")};
  background: ${({ $active }) => ($active ? "#ffd166" : "transparent")};
  transition: background 120ms ease, color 120ms ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? "#ffd166" : "rgba(255,209,102,0.12)"};
    color: ${({ $active }) => ($active ? "#081018" : "#0b1220")};
  }

  &:active {
    transform: scale(0.995);
  }
`;

const MobileSelect = styled.select`
  display: none;

  @media (max-width: 900px) {
    display: block;
    width: 100%;
    padding: 0.6rem 1rem;
    border-radius: 10px;
    border: 1px solid #e6e9eb;
    font-weight: 700;
    background: #fff;
    font-size: 0.95rem;
    color: #0b1220;
    box-shadow: 0 2px 6px rgba(16, 24, 40, 0.04);

    &:focus {
      border-color: #ffd166;
      box-shadow: 0 0 0 4px rgba(255, 209, 102, 0.12);
      outline: none;
    }
  }
`;

const ClearButton = styled.button`
  width: 80px;
  font-size: 0.9rem;
  padding: 0.46rem 0.56rem;
  border-radius: 8px;
  background: #fff8f2;
  border: 1px solid #ffd166;
  font-weight: 600;
  color: #444;
  cursor: pointer;
  transition: all 0.16s ease;

  &:hover {
    border-color: #ffd166;
    background: linear-gradient(90deg, #ff7a18, #ffd166);
    color: #fff;
  }
`;

export default ProductFilters;

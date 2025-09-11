import React, { useState, useEffect } from "react";
import styled from "styled-components";

const images = [
  "/banner/primera.jpg",
  "/banner/segunda.jpg",
  "/banner/tercera.jpg",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 3000);
    return () => clearInterval(interval);
  }, [length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  return (
    <CarouselWrapper>
      <SlidesWrapper current={current}>
        {images.map((img, idx) => (
          <Slide key={idx}>
            <img src={img} alt={`Slide ${idx}`} />
          </Slide>
        ))}
      </SlidesWrapper>

      <PrevButton onClick={prevSlide}>&#10094;</PrevButton>
      <NextButton onClick={nextSlide}>&#10095;</NextButton>

      <Dots>
        {images.map((_, idx) => (
          <Dot
            key={idx}
            $active={idx === current}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </Dots>
    </CarouselWrapper>
  );
};

export default Carousel;

/* ===== Styled Components ===== */
const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const SlidesWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => -props.current * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
`;

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
`;

const Dots = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$active ? "hsl(26, 100%, 55%)" : "hsl(220, 14%, 75%)"};
  cursor: pointer;
`;
